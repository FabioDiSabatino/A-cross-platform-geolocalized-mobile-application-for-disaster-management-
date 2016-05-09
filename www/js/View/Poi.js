var View;
(function (View) {
    "use strict";
    var Poi = (function () {
        function Poi() {
            var templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/poi-list.tmpl", false);
            templateGetter.send();
            this.compiledListTemplate = Handlebars.compile(templateGetter.responseText);
        }
        Poi.prototype.initialize = function () {
            var _this = this;
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "poi") {
                    return;
                }
                if (main.PoiList.CurrentSorting !== null) {
                    switch (main.PoiList.CurrentSorting) {
                        case poiSorting.latest:
                            document.getElementById("poi-latest").classList.add("active");
                            break;
                        case poiSorting.nearest:
                            document.getElementById("poi-nearest").classList.add("active");
                            break;
                        case poiSorting.reportNumber:
                            document.getElementById("poi-report-number").classList.add("active");
                            break;
                    }
                }
                document.getElementById("back-from-poi").addEventListener(main.UXEvent, function () {
                    if (typeof main.CHome !== "undefined") {
                        main.CHome.stop();
                    }
                    main.navigateBack();
                }, false);
                _this.renderList();
                document.getElementById("poi-latest").addEventListener(main.UXEvent, function () {
                    _this.sort(poiSorting.latest);
                    $("#popupMenu").popup("close");
                }, true);
                document.getElementById("poi-nearest").addEventListener(main.UXEvent, function () {
                    _this.sort(poiSorting.nearest);
                    $("#popupMenu").popup("close");
                }, true);
                document.getElementById("poi-report-number").addEventListener(main.UXEvent, function () {
                    _this.sort(poiSorting.reportNumber);
                    $("#popupMenu").popup("close");
                }, true);
                document.getElementById("lista-poi").addEventListener(main.UXEvent, function () { return _this.renderList(); }, false);
                document.getElementById("mappa-poi").addEventListener(main.UXEvent, function () { return _this.renderMap(); }, false);
            });
        };
        Poi.prototype.sort = function (sortBy) {
            switch (sortBy) {
                case poiSorting.latest:
                    main.PoiList.sortByLatestUpdate();
                    break;
                case poiSorting.nearest:
                    main.PoiList.sortByNearest();
                    break;
                case poiSorting.reportNumber:
                    main.PoiList.sortByReportNumber();
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
                main.CHome.centerView(main.PoiList[0]);
            }
        };
        Poi.prototype.showPopover = function () {
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
        Poi.prototype.renderList = function (forced) {
            if (typeof forced !== "undefined" && !forced) {
                if (this.currentView === 0) {
                    return;
                }
                else if (this.currentView === 1) {
                    delete main.CHome;
                }
            }
            var list = document.createElement("ul");
            list.id = "poi-list";
            list.className = "table-view table-stato";
            for (var i = 0; i < main.PoiList.length; ++i) {
                list.innerHTML += this.compiledListTemplate(main.PoiList[i]);
            }
            document.getElementById("content-poi").innerHTML = list.outerHTML;
            var filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Order by:";
            filtersTitle.classList.add("order-by");
            this.currentView = 0;
        };
        Poi.prototype.renderMap = function () {
            if (this.currentView === 1) {
                return;
            }
            var templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/poi-map.html", false);
            templateGetter.send();
            document.getElementById("content-poi").innerHTML = templateGetter.responseText;
            main.CHome = new Controller.Home();
            main.VHome = new View.Home();
            main.VHome.clearMap();
            main.VHome.noCenterMe();
            main.VHome.addPoi(main.PoiList);
            main.CHome.Map.on("load", function () {
                main.CHome.centerView(main.PoiList[0]);
            });
            var filtersTitle = document.getElementById("filters-title");
            filtersTitle.textContent = "Center view on:";
            filtersTitle.classList.remove("order-by");
            this.currentView = 1;
        };
        return Poi;
    }());
    View.Poi = Poi;
})(View || (View = {}));
//# sourceMappingURL=Poi.js.map