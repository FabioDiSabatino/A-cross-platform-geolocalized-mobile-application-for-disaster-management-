var View;
(function (View) {
    "use strict";
    var Foi = (function () {
        function Foi() {
            var templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/foi-list.tmpl", false);
            templateGetter.send();
            this.compiledListTemplate = Handlebars.compile(templateGetter.responseText);
        }
        Foi.prototype.initialize = function () {
            var _this = this;
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "foi") {
                    return;
                }
                if (main.FoiList.CurrentSorting !== null) {
                    switch (main.FoiList.CurrentSorting) {
                        case foiSorting.latestUpdate:
                            document.getElementById("foi-latest").classList.add("active");
                            break;
                        case foiSorting.nearest:
                            document.getElementById("foi-nearest").classList.add("active");
                            break;
                        case foiSorting.seriousness:
                            document.getElementById("foi-seriousness").classList.add("active");
                            break;
                    }
                }
                document.getElementById("back-from-foi").addEventListener(main.UXEvent, function () {
                    if (typeof main.CHome !== "undefined") {
                        main.CHome.stop();
                    }
                    main.navigateBack();
                }, false);
                _this.renderList(true);
                document.getElementById("foi-popup").addEventListener(main.UXEvent, function () { return _this.showPopover(); });
                document.getElementById("foi-latest").addEventListener(main.UXEvent, function () {
                    _this.sort(foiSorting.latestUpdate);
                    $("#popupMenu").popup("close");
                    _this.renderList(true);
                }, true);
                document.getElementById("foi-nearest").addEventListener(main.UXEvent, function () {
                    _this.sort(foiSorting.nearest);
                    $("#popupMenu").popup("close");
                    _this.renderList(true);
                }, true);
                document.getElementById("foi-seriousness").addEventListener(main.UXEvent, function () {
                    _this.sort(foiSorting.seriousness);
                    $("#popupMenu").popup("close");
                    _this.renderList(true);
                }, true);
                document.getElementById("lista-foi").addEventListener(main.UXEvent, function () { return _this.renderList(); }, false);
                document.getElementById("mappa-foi").addEventListener(main.UXEvent, function () { return _this.renderMap(); }, false);
            });
        };
        Foi.prototype.sort = function (sortBy) {
            switch (sortBy) {
                case foiSorting.latestUpdate:
                    main.FoiList.sortByLatestUpdate();
                    break;
                case foiSorting.nearest:
                    main.FoiList.sortByNearest();
                    break;
                case foiSorting.seriousness:
                    main.FoiList.sortBySeriousness();
                    break;
            }
            var checks = [document.getElementById("check-latest"),
                document.getElementById("check-nearest"),
                document.getElementById("check-seriousness")];
            for (var i = 0; i < checks.length; ++i) {
                if (i === sortBy) {
                    checks[i].classList.add("active");
                }
                else {
                    checks[i].classList.remove("active");
                }
            }
            if (document.getElementById("filters-title").classList.contains("order-by")) {
                this.renderList();
            }
            else {
                main.CHome.centerView(main.FoiList[0]);
            }
        };
        Foi.prototype.showPopover = function () {
            var options = {
                "positionTo": "#foi-popup",
                "overlayTheme": "a",
                "history": false,
                "transition": "pop"
            };
            var popupElement = $("#popupMenu");
            popupElement.popup(options);
            popupElement.popup("open");
        };
        Foi.prototype.renderList = function (forced) {
            if (typeof forced !== "undefined" && !forced) {
                if (this.currentView === 0) {
                    return;
                }
                else if (this.currentView === 1) {
                    main.CHome.stop();
                }
            }
            var list = document.createElement("ul");
            list.id = "poi-list";
            list.className = "table-view table-stato";
            for (var i = 0; i < main.FoiList.length; ++i) {
                list.innerHTML += this.compiledListTemplate(main.FoiList[i]);
            }
            document.getElementById("content-foi").innerHTML = list.outerHTML;
            var filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Order by:";
            filtersTitle.classList.add("order-by");
            this.currentView = 0;
        };
        Foi.prototype.renderMap = function () {
            if (this.currentView === 1) {
                return;
            }
            var templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/foi-map.html", false);
            templateGetter.send();
            document.getElementById("content-foi").innerHTML = templateGetter.responseText;
            main.CHome = new Controller.Home();
            main.VHome = new View.Home();
            main.VHome.clearMap();
            main.VHome.noCenterMe();
            main.VHome.addFoi(main.FoiList);
            main.CHome.Map.on("load", function () {
                main.CHome.centerView(main.FoiList[0]);
            });
            var filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Center view on:";
            filtersTitle.classList.remove("order-by");
            this.currentView = 1;
        };
        return Foi;
    }());
    View.Foi = Foi;
})(View || (View = {}));
//# sourceMappingURL=Foi.js.map