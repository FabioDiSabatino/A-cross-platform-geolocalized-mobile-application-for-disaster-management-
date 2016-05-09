var Controller;
(function (Controller) {
    "use strict";
    var Main = (function () {
        function Main() {
            var _this = this;
            document.addEventListener("deviceready", function () {
                if (device.platform === "iOS" && parseFloat(device.version) === 7.0) {
                    document.querySelector("meta[name=viewport]").setAttribute("content", "user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1");
                }
                else {
                    document.querySelector("meta[name=viewport]").setAttribute("content", "user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, height=device-height");
                }
            }, false);
            this.pageStack = [];
            this.handlers = new Controller.PageHandler();
            document.addEventListener("backbutton", function () {
                if (_this.pageStack.length !== 1) {
                    _this.navigateBack();
                }
            }, false);
            this.setUXEvent();
            this.setTapHoldEvent();
            var dashboardView = this.handlers.addHandler("dashboard", new View.Dashboard());
            this.navigateTo("dashboard.html", dashboardView);
            $.getJSON("foi.json", function (jsonFoi) {
                Foundation.ContactGetter.initialize();
                document.addEventListener("contactsLoaded", function () {
                    _this.foiList = Entity.FoiCollection.parseJSON(jsonFoi);
                    var created = document.createEvent("Event");
                    created.initEvent("foiCreated", true, true);
                    document.dispatchEvent(created);
                    var dash = _this.handlers.getHandler("dashboard");
                    dash.updateFoiBanner();
                });
            });
            $.getJSON("poi.json", function (jsonPoi) {
                _this.poiList = Entity.PoiCollection.parseJSON(jsonPoi);
            });
        }
        Object.defineProperty(Main.prototype, "FoiList", {
            get: function () {
                return this.foiList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "PoiList", {
            get: function () {
                return this.poiList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "PageHandlers", {
            get: function () {
                return this.handlers;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "CHome", {
            get: function () {
                return this.chome;
            },
            set: function (chome) {
                if (typeof this.chome !== "undefined") {
                    this.chome.Map.remove();
                }
                this.chome = chome;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "VHome", {
            get: function () {
                return this.vhome;
            },
            set: function (vhome) {
                this.vhome = vhome;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Main.prototype, "UXEvent", {
            get: function () {
                return this.uxevent;
            },
            enumerable: true,
            configurable: true
        });
        Main.prototype.navigateTo = function (page, pageHandler) {
            var currentlyShownPages = document.getElementsByClassName("ui-page");
            var absoluteUrl = currentlyShownPages[currentlyShownPages.length - 1].dataset.url;
            this.pageStack.push(absoluteUrl.slice(absoluteUrl.lastIndexOf("/") + 1));
            $.mobile.pageContainer.pagecontainer("change", page, { changeHash: false, role: "page" });
            pageHandler.initialize();
        };
        Main.prototype.navigateBack = function () {
            $.mobile.pageContainer.pagecontainer("change", main.pageStack.pop(), { changeHash: false, role: "page" });
        };
        Main.prototype.setUXEvent = function () {
            if ("ontouchstart" in window) {
                this.uxevent = "touchstart";
            }
            else if ("MSPointerDown" in window) {
                this.uxevent = "MSPointerDown";
            }
            else {
                this.uxevent = "click";
            }
        };
        Main.prototype.setTapHoldEvent = function () {
            if (this.uxevent === "touchstart") {
                var startTime_1;
                var endTime_1;
                var gbMove_1;
                document.addEventListener("touchstart", function (event) {
                    startTime_1 = new Date().getTime();
                    gbMove_1 = false;
                }, false);
                document.addEventListener("touchmove", function (event) {
                    gbMove_1 = true;
                }, false);
                document.addEventListener("touchend", function (event) {
                    endTime_1 = new Date().getTime();
                    if (!gbMove_1 && (endTime_1 - startTime_1) / 1000 > 2) {
                        var taphold = document.createEvent("Event");
                        taphold.initEvent("taphold", true, true);
                        document.dispatchEvent(taphold);
                    }
                }, false);
            }
            else {
                document.addEventListener("mousedown", function (e) {
                    if (e.which === 3) {
                        var taphold = document.createEvent("Event");
                        taphold.initEvent("taphold", true, true);
                        document.dispatchEvent(taphold);
                    }
                });
            }
        };
        return Main;
    }());
    Controller.Main = Main;
})(Controller || (Controller = {}));
document.addEventListener("deviceready", function () {
    main = new Controller.Main();
}, false);
//# sourceMappingURL=Main.js.map