namespace View {
    "use strict";
    export class Foi implements IPage {
        private compiledListTemplate: HandlebarsTemplateDelegate;
        /**
         * Specifies current view:
         * 0 = List
         * 1 = Map
         */
        private currentView: number;

        public constructor() {
            let templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/foi-list.tmpl", false);
            templateGetter.send();
            this.compiledListTemplate = Handlebars.compile(templateGetter.responseText);
        }

        public initialize() {
            $(document).on("pagecontainerchange", (event: JQueryEventObject, pages: any) => {
                if (pages.toPage.children().prop("id") !== "foi") {
                    return;
                }
                if (main.FoiList.CurrentSorting !== null) {
                    switch (main.FoiList.CurrentSorting) {
                        case foiSorting.latestUpdate: document.getElementById("foi-latest").classList.add("active"); break;
                        case foiSorting.nearest: document.getElementById("foi-nearest").classList.add("active"); break;
                        case foiSorting.seriousness: document.getElementById("foi-seriousness").classList.add("active"); break;
                    }
                }
                document.getElementById("back-from-foi").addEventListener(main.UXEvent, () => {
                    if (typeof main.CHome !== "undefined") {
                        main.CHome.stop();
                    }
                    main.navigateBack();
                }, false);
                this.renderList(true);
                document.getElementById("foi-popup").addEventListener(main.UXEvent, () => this.showPopover());
                document.getElementById("foi-latest").addEventListener(main.UXEvent, () => {
                    this.sort(foiSorting.latestUpdate);
                    $("#popupMenu").popup("close");
                    this.renderList(true);
                }, true);
                document.getElementById("foi-nearest").addEventListener(main.UXEvent, () => {
                    this.sort(foiSorting.nearest);
                    $("#popupMenu").popup("close");
                    this.renderList(true);
                }, true);
                document.getElementById("foi-seriousness").addEventListener(main.UXEvent, () => {
                    this.sort(foiSorting.seriousness);
                    $("#popupMenu").popup("close");
                    this.renderList(true);
                }, true);
                document.getElementById("lista-foi").addEventListener(main.UXEvent, () => this.renderList(), false);
                document.getElementById("mappa-foi").addEventListener(main.UXEvent, () => this.renderMap(), false);
            });
        }

        /**
         * Sorts element in list or centers map on first in
         * sorting FOI.
         * @param sortBy Sorting tipology.
         * Available choises:
         * 0 -> Sort by latest update
         * 1 -> Sort by nearest
         * 2 -> Sort by seriousness
         */
        private sort(sortBy: foiSorting) {
            switch (sortBy) {
                case foiSorting.latestUpdate: main.FoiList.sortByLatestUpdate(); break;
                case foiSorting.nearest: main.FoiList.sortByNearest(); break;
                case foiSorting.seriousness: main.FoiList.sortBySeriousness(); break;
            }
            var checks = [document.getElementById("check-latest"),
                document.getElementById("check-nearest"),
                document.getElementById("check-seriousness")];
            for (let i = 0; i < checks.length; ++i) {
                if (i === sortBy) {
                    checks[i].classList.add("active");
                } else {
                    checks[i].classList.remove("active");
                }
            }
            // mi trovo nella schermata a lista
            if (document.getElementById("filters-title").classList.contains("order-by")) {
                this.renderList();
            } else { // mi trovo nella schermata a mappa
                main.CHome.centerView(main.FoiList[0]);
            }
        }

        private showPopover() {
            let options: PopupOptions = {
                "positionTo": "#foi-popup",
                "overlayTheme": "a",
                "history": false,
                "transition": "pop"

            };
            let popupElement = $("#popupMenu");
            popupElement.popup(options);
            popupElement.popup("open");
        }

        /**
         * Renders FOI's list.
         * @param forced Forces this method to execute even if not from map view
         */
        private renderList(forced?: boolean) {
            if (typeof forced !== "undefined" && !forced) {
                if (this.currentView === 0) {
                    return;
                } else if (this.currentView === 1) {
                    main.CHome.stop();
                }
            }
            var list = document.createElement("ul");
            list.id = "poi-list";
            list.className = "table-view table-stato";
            for (let i = 0; i < main.FoiList.length; ++i) {
                list.innerHTML += this.compiledListTemplate(main.FoiList[i]);
            }
            document.getElementById("content-foi").innerHTML = list.outerHTML;
            let filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Order by:";
            filtersTitle.classList.add("order-by");
            this.currentView = 0;
        }

        private renderMap() {
            if (this.currentView === 1) {
                return;
            }
            let templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/foi-map.html", false);
            templateGetter.send();
            document.getElementById("content-foi").innerHTML = templateGetter.responseText;
            main.CHome = new Controller.Home();
            main.VHome = new View.Home();
            main.VHome.clearMap();
            main.VHome.noCenterMe();
            main.VHome.addFoi(main.FoiList);
            main.CHome.Map.on("load", () => {
                main.CHome.centerView(main.FoiList[0]);
            });
            let filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Center view on:";
            filtersTitle.classList.remove("order-by");
            this.currentView = 1;
        }
    }
}