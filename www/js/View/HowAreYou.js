var View;
(function (View) {
    "use strict";
    var HowAreYou = (function () {
        function HowAreYou() {
        }
        HowAreYou.prototype.initialize = function () {
            var _this = this;
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "howareyou") {
                    return;
                }
                document.getElementById("back-from-howareyou").addEventListener(main.UXEvent, main.navigateBack);
                document.getElementById("publish-howareyou").addEventListener(main.UXEvent, function () {
                    if (typeof _this.selected !== "undefined") {
                        window.alert("Una squadra di soccorso arriverà il prima possibile");
                    }
                    else {
                        window.alert("seleziona prima il tuo stato");
                    }
                });
                var listItems = document.querySelectorAll("#statuses > li");
                for (var i = 0; i < listItems.length; ++i) {
                    listItems[i].addEventListener(main.UXEvent, function (e) {
                        var listItems = document.getElementById("statuses").children;
                        for (var i_1 = 0; i_1 < listItems.length; ++i_1) {
                            if (listItems[i_1].dataset.status === e.currentTarget.dataset.status) {
                                listItems[i_1].classList.remove("no-active");
                                listItems[i_1].classList.add("text-active");
                                _this.selected = parseInt(listItems[i_1].dataset.status, 10);
                            }
                            else {
                                listItems[i_1].classList.add("no-active");
                                listItems[i_1].classList.remove("text-active");
                            }
                        }
                    });
                }
            });
        };
        return HowAreYou;
    }());
    View.HowAreYou = HowAreYou;
})(View || (View = {}));
//# sourceMappingURL=HowAreYou.js.map