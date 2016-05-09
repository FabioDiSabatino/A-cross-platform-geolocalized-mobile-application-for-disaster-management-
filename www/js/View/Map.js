var View;
(function (View) {
    "use strict";
    var MapPage = (function () {
        function MapPage() {
        }
        MapPage.prototype.initialize = function () {
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "map-widget") {
                    return;
                }
                document.getElementById("back-from-map").addEventListener(main.UXEvent, function () {
                    main.CHome.stop();
                    main.navigateBack();
                });
                document.getElementById("latest").addEventListener(main.UXEvent, function () {
                    news.official = sortLatestNews(news);
                    $(".check-latest").addClass("active");
                    $(".check-nearest").removeClass("active");
                });
                document.getElementById("nearest").addEventListener(main.UXEvent, function () {
                    news.official = sortNearest(news);
                    $(".check-nearest").addClass("active");
                    $(".check-latest").removeClass("active");
                });
                main.CHome = new Controller.Home();
                main.VHome = new View.Home();
                main.VHome.noCenterMe();
                main.CHome.Map.on("load", function () {
                    main.VHome.addNews(news.official);
                });
            });
        };
        return MapPage;
    }());
    View.MapPage = MapPage;
})(View || (View = {}));
var sortNearest = function (dati) {
    var arr = dati.official;
    arr.sort(function (a, b) {
        return parseFloat(a.distanza) - parseFloat(b.distanza);
    });
    return arr;
};
//# sourceMappingURL=Map.js.map