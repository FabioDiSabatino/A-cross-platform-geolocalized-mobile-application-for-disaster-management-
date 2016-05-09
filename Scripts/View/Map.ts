namespace View {
    "use strict";
    export class MapPage implements IPage {
        public initialize() {
            $(document).on("pagecontainerchange", (event: JQueryEventObject, pages: any) => {
                if (pages.toPage.children().prop("id") !== "map-widget") {
                    return;
                }
                document.getElementById("back-from-map").addEventListener(main.UXEvent, () => {
                    main.CHome.stop();
                    main.navigateBack();
                });
                document.getElementById("latest").addEventListener(main.UXEvent, () => {
                    // riordino schede o centra mappa in base al più vicino
                    news.official = sortLatestNews(news);
                    // no class for news yet!
                    // chome.centerView(news.official[0].position);
                    $(".check-latest").addClass("active");
                    $(".check-nearest").removeClass("active");
                });
                document.getElementById("nearest").addEventListener(main.UXEvent, () => {
                    // riordino schede o centra mappa in base al più vicino
                    news.official = sortNearest(news);
                    // no class for news yet!
                    // chome.centerView(news.official[0].position);
                    $(".check-nearest").addClass("active");
                    $(".check-latest").removeClass("active");
                });
                main.CHome = new Controller.Home();
                main.VHome = new View.Home();
                main.VHome.noCenterMe();
                main.CHome.Map.on("load", () => {
                    main.VHome.addNews(news.official);
                    // no class for news yet!
                    // chome.centerView(news.official[0].position);
                });
            });
        }
    }
}


var sortNearest = function (dati) {
    var arr = dati.official;
    arr.sort(function (a, b) {
        return parseFloat(a.distanza) - parseFloat(b.distanza);
    });
    return arr;
};