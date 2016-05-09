namespace View {
    "use strict";
    export class Poi implements IPage {
        private compiledListTemplate: HandlebarsTemplateDelegate;
        /**
         * Specifies current view:
         * 0 = List
         * 1 = Map
         */
        private currentView: number;

        public constructor() {
            let templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/poi-list.tmpl", false);
            templateGetter.send();
            this.compiledListTemplate = Handlebars.compile(templateGetter.responseText);
        }

        public initialize() {
            $(document).on("pagecontainerchange", (event: JQueryEventObject, pages: any) => {
                if (pages.toPage.children().prop("id") !== "poi") {
                    return;
                }
                if (main.PoiList.CurrentSorting !== null) {
                    switch (main.PoiList.CurrentSorting) {
                        case poiSorting.latest: document.getElementById("poi-latest").classList.add("active"); break;
                        case poiSorting.nearest: document.getElementById("poi-nearest").classList.add("active"); break;
                        case poiSorting.reportNumber: document.getElementById("poi-report-number").classList.add("active"); break;
                    }
                }
                document.getElementById("back-from-poi").addEventListener(main.UXEvent, () => {
                    if (typeof main.CHome !== "undefined") {
                        main.CHome.stop();
                    }
                    main.navigateBack();
                }, false);
                this.renderList();
                document.getElementById("poi-latest").addEventListener(main.UXEvent, () => {
                    this.sort(poiSorting.latest);
                    $("#popupMenu").popup("close");

                }, true);
                document.getElementById("poi-nearest").addEventListener(main.UXEvent, () => {
                    this.sort(poiSorting.nearest);
                    $("#popupMenu").popup("close");

                }, true);
                document.getElementById("poi-report-number").addEventListener(main.UXEvent, () => {
                    this.sort(poiSorting.reportNumber);
                    $("#popupMenu").popup("close");

                }, true);
                document.getElementById("lista-poi").addEventListener(main.UXEvent, () => this.renderList(), false);
                document.getElementById("mappa-poi").addEventListener(main.UXEvent, () => this.renderMap(), false);
            });
        }

        /**
         * Sorts element in list or centers map on first in
         * sorting POI.
         * @param sortBy Sorting tipology.
         * Available choises:
         * 0 -> Sort by report number
         * 1 -> Sort by nearest
         * 2 -> Sort by latest update
         */
        private sort(sortBy: poiSorting) {
            switch (sortBy) {
                case poiSorting.latest: main.PoiList.sortByLatestUpdate(); break;
                case poiSorting.nearest: main.PoiList.sortByNearest(); break;
                case poiSorting.reportNumber: main.PoiList.sortByReportNumber(); break;
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
                main.CHome.centerView(main.PoiList[0]);
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
                    delete main.CHome;
                }
            }
            var list = document.createElement("ul");
            list.id = "poi-list";
            list.className = "table-view table-stato";
            for (let i = 0; i < main.PoiList.length; ++i) {
                list.innerHTML += this.compiledListTemplate(main.PoiList[i]);
            }
            document.getElementById("content-poi").innerHTML = list.outerHTML;
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
            templateGetter.open("GET", "templates/poi-map.html", false);
            templateGetter.send();
            document.getElementById("content-poi").innerHTML = templateGetter.responseText;
            main.CHome = new Controller.Home();
            main.VHome = new View.Home();
            main.VHome.clearMap();
            main.VHome.noCenterMe();
            main.VHome.addPoi(main.PoiList);
            main.CHome.Map.on("load", () => {
                main.CHome.centerView(main.PoiList[0]);
            });
            let filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Center view on:";
            filtersTitle.classList.remove("order-by");
            this.currentView = 1;
        }
    }
}