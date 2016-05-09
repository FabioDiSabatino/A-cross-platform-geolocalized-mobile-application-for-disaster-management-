var View;
(function (View) {
    "use strict";
    var Map = (function () {
        function Map(map) {
            this.map = map;
            this.myPositionMarker = undefined;
            this.first = true;
            this.centerMe = true;
            this.meIcon = L.icon({
                iconUrl: "./img/marker-icon.png",
                iconRetinaUrl: "./img/marker-icon-2x.png",
                iconSize: [25, 41],
                popupAnchor: [-3, -76],
                shadowUrl: "./img/marker-shadow.png",
                shadowRetinaUrl: "./img/marker-shadow.png",
                shadowSize: [30, 45],
                shadowAnchor: [10, 20],
            });
            this.markers = L.markerClusterGroup({
                maxClusterRadius: 120,
                iconCreateFunction: function (cluster) {
                    return L.divIcon({
                        html: "<strong>" + cluster.getChildCount() + "</strong>",
                        className: "foiCluster", iconSize: L.point(40, 40)
                    });
                },
                spiderfyDistanceMultiplier: 2, showCoverageOnHover: false, zoomToBoundsOnClick: false
            });
            this.markers.on("clusterclick", function (a) {
                a.layer.spiderfy();
                var markers = a.layer.getAllChildMarkers();
                for (var i = 0; i < markers.length; ++i) {
                    markers[i].openPopup();
                }
            });
        }
        Object.defineProperty(Map.prototype, "First", {
            get: function () {
                return this.first;
            },
            set: function (f) {
                this.first = f;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Map.prototype, "CenterMe", {
            get: function () {
                return this.centerMe;
            },
            set: function (c) {
                this.centerMe = c;
            },
            enumerable: true,
            configurable: true
        });
        Map.prototype.addMarker = function (dati) {
            if (this.first) {
                if (this.centerMe) {
                    this.map.setView(dati, 17);
                }
                this.first = false;
            }
            else {
                this.map.removeLayer(this.myPositionMarker);
            }
            this.myPositionMarker = L.circleMarker(dati, { radius: 10 }).addTo(this.map);
        };
        Map.prototype.addFoi = function (dati) {
            for (var i = 0; i < dati.length; ++i) {
                var coordinates = Controller.Grid.coordFromCell(dati[i]);
                var foi = new (L.Icon.extend({
                    "options": {
                        "iconSize": [40, 50],
                        "iconUrl": dati[i].Picture
                    }
                }));
                var marker_foi = L.marker(coordinates, { icon: foi });
                var foi_popup = "<h3>" + dati[i].StatusCode + "</h3> <p class='bolded'> at " +
                    dati[i].LatestUpdate.toLocaleDateString() + "</p>";
                marker_foi.bindPopup(foi_popup);
                this.markers.addLayer(marker_foi);
            }
            this.map.addLayer(this.markers);
        };
        Map.prototype.addPoi = function (dati) {
            for (var i = 0; i < dati.length; ++i) {
                var coordinates = Controller.Grid.coordFromCell(dati[i]);
                var poi = new (L.Icon.extend({
                    "options": {
                        "iconSize": [40, 50],
                        "iconUrl": "./img/" + dati[i].Picture + ".png"
                    }
                }));
                var marker_poi = L.marker(coordinates, { icon: poi });
                var poi_popup = "<h3>" + dati[i].EmergencyCode + "</h3> <p class='bolded'> signaled " +
                    dati[i].EmergencyCode + " times latest at " + dati[i].LatestUpdate.toLocaleDateString() + "</p>";
                marker_poi.bindPopup(poi_popup);
                this.markers.addLayer(marker_poi);
            }
            this.map.addLayer(this.markers);
        };
        Map.prototype.addNews = function (dati) {
            for (var i = 0; i < dati.length; ++i) {
                var coordinates = Controller.Grid.coordFromCell(dati[i].position);
                var news = new (L.Icon.extend({
                    "options": {
                        "iconSize": [50, 60],
                        "iconUrl": "./img/newsicon.png"
                    }
                }));
                var marker_news = L.marker(coordinates, { icon: news });
                var news_popup = "<h3 class='title-news'>" + dati[i].title + "</h3> <p class='bolded'>" +
                    dati[i].content + ". At " + dati[i].times + "</p> <p";
                marker_news.bindPopup(news_popup);
                this.markers.addLayer(marker_news);
            }
            this.map.addLayer(this.markers);
        };
        Map.prototype.addHold = function (pos) {
            if (this.clicked) {
                this.map.removeLayer(this.clicked);
            }
            this.map.setView(pos, 15);
            this.clicked = L.circleMarker(pos, { radius: 10, color: "red" }).addTo(this.map);
        };
        Map.prototype.removeMarkers = function () {
            this.map.removeLayer(this.markers);
        };
        return Map;
    }());
    View.Map = Map;
})(View || (View = {}));
//# sourceMappingURL=Vmap.js.map