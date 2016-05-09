var View;
(function (View) {
    "use strict";
    var Signal = (function () {
        function Signal() {
        }
        Signal.prototype.initialize = function () {
            var _this = this;
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "signal") {
                    return;
                }
                document.getElementById("back-from-signal").addEventListener(main.UXEvent, main.navigateBack);
                var listItems = document.getElementsByClassName("cell-signal");
                for (var i = 0; i < listItems.length; ++i) {
                    listItems[i].addEventListener(main.UXEvent, function (e) {
                        var listItems = document.getElementById("emergencies").children;
                        for (var i_1 = 0; i_1 < listItems.length; ++i_1) {
                            if (listItems[i_1].dataset.emergency === e.currentTarget.dataset.emergency) {
                                listItems[i_1].classList.remove("no-active");
                                listItems[i_1].classList.add("active");
                                listItems[i_1].classList.add("text-active");
                                _this.selected = parseInt(listItems[i_1].dataset.emergency, 10);
                            }
                            else {
                                listItems[i_1].classList.add("no-active");
                                listItems[i_1].classList.remove("active");
                                listItems[i_1].classList.remove("text-active");
                            }
                        }
                        $(".content").animate({ scrollTop: $(document).height() }, 1200);
                    });
                }
                document.getElementById("reset").addEventListener(main.UXEvent, function () {
                    var listItems = document.getElementsByClassName("cell-signal");
                    for (var i = 0; i < listItems.length; ++i) {
                        listItems[i].classList.remove("active");
                        listItems[i].classList.remove("text-active");
                    }
                    document.getElementById("send-signal").classList.remove("hidden");
                });
                document.getElementById("map").addEventListener(main.UXEvent, function () {
                    var mapView = main.PageHandlers.existsHandler("signalmap") ?
                        main.PageHandlers.getHandler("signalmap") :
                        main.PageHandlers.addHandler("signalmap", new View.Poi());
                    main.navigateTo("signalmap.html", mapView);
                });
                document.getElementById("camera").addEventListener(main.UXEvent, function () {
                    window.alert("Sorry now it's not possible upload photo because network is overload");
                });
                document.getElementById("closed").addEventListener(main.UXEvent, function () {
                    main.navigateBack();
                });
            });
        };
        return Signal;
    }());
    View.Signal = Signal;
})(View || (View = {}));
//# sourceMappingURL=Signal.js.map