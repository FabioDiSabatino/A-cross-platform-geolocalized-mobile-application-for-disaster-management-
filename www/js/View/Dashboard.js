var sortLatestNews = function (dati) {
    var arr = dati.official;
    arr.sort(function (a, b) {
        return parseFloat(b.times) - parseFloat(a.times);
    });
    return arr;
};
var news = {
    official: [
        {
            title: "Disaster balance",
            content: "the local police confirmed: over 348 people are homeless, balance probably we'll grow in the next hours",
            position: { zero: { lat: 42.368, lng: 13.369 }, cell: { cell_number_lat: 4, cell_number_lng: 4 } },
            times: "21.30",
            date: " 15/02",
            distanza: 40,
        },
        {
            title: "Road interrupt",
            content: "Over 100 users has signaled that the this road is not accessible by car",
            position: { zero: { lat: 42.368, lng: 13.357 }, cell: { cell_number_lat: 4, cell_number_lng: 4 } },
            times: "11.20",
            date: " 15/02",
            distanza: 10,
        },
        {
            title: "Food and water",
            content: "civil protection have set up camp for the supply of food, water and the first assistance",
            position: { zero: { lat: 42.368, lng: 13.329 }, cell: { cell_number_lat: 4, cell_number_lng: 4 } },
            times: "17.20",
            date: " 15/02",
            distanza: 21
        }
    ]
};
var View;
(function (View) {
    "use strict";
    var Dashboard = (function () {
        function Dashboard() {
            var templateGetter = new XMLHttpRequest();
            templateGetter.open("GET", "templates/foi-home.tmpl", false);
            templateGetter.send();
            this.compiledFoiTemplate = Handlebars.compile(templateGetter.responseText);
        }
        Dashboard.prototype.initialize = function () {
            var _this = this;
            $(document).on("pagecontainerchange", function (event, pages) {
                if (pages.toPage.children().prop("id") !== "dashboard") {
                    return;
                }
                document.getElementById("comestai-button").addEventListener(main.UXEvent, function () {
                    var howAreYouView = main.PageHandlers.existsHandler("howareyou") ?
                        main.PageHandlers.getHandler("howareyou") :
                        main.PageHandlers.addHandler("howareyou", new View.HowAreYou());
                    main.navigateTo("howareyou.html", howAreYouView);
                });
                document.getElementById("poi").addEventListener(main.UXEvent, function () {
                    var poiView = main.PageHandlers.existsHandler("poi") ?
                        main.PageHandlers.getHandler("poi") :
                        main.PageHandlers.addHandler("poi", new View.Poi());
                    main.navigateTo("poi.html", poiView);
                });
                document.getElementById("segnala-button").addEventListener(main.UXEvent, function () {
                    var signalView = main.PageHandlers.existsHandler("signal") ?
                        main.PageHandlers.getHandler("signal") :
                        main.PageHandlers.addHandler("signal", new View.Signal());
                    main.navigateTo("signal.html", signalView);
                });
                document.getElementById("foi").addEventListener(main.UXEvent, function () {
                    var foiView = main.PageHandlers.existsHandler("foi") ?
                        main.PageHandlers.getHandler("foi") :
                        main.PageHandlers.addHandler("foi", new View.Foi());
                    main.navigateTo("foi.html", foiView);
                });
                document.getElementById("map-widget").addEventListener(main.UXEvent, function () {
                    var mapView = main.PageHandlers.existsHandler("map") ?
                        main.PageHandlers.getHandler("map") :
                        main.PageHandlers.addHandler("map", new View.MapPage());
                    main.navigateTo("map.html", mapView);
                });
                if (typeof main.FoiList !== "undefined" && main.FoiList.IsComplete) {
                    _this.updateFoiBanner();
                }
                sortLatestNews(news);
                $(".title-news").text(news.official[0].title);
                $(".content-news").text(news.official[0].content);
            });
        };
        Dashboard.prototype.updateFoiBanner = function () {
            document.getElementById("foi-most-serious").innerHTML = this.compiledFoiTemplate(main.FoiList.mostSerious());
        };
        return Dashboard;
    }());
    View.Dashboard = Dashboard;
})(View || (View = {}));
//# sourceMappingURL=Dashboard.js.map