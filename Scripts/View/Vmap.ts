namespace View {
    "use strict";
    export class Map {
        private myPositionMarker: L.ILayer;
        private first: boolean;
        get First(): boolean {
            return this.first;
        }
        set First(f: boolean) {
            this.first = f;
        }
        private meIcon: L.Icon;
        private centerMe: boolean;
        get CenterMe(): boolean {
            return this.centerMe;
        }
        set CenterMe(c: boolean) {
            this.centerMe = c;
        }
        private markers: L.MarkerClusterGroup;
        private clicked: L.Path;
        private map: L.Map;

        /**
         * Inizializza una nuova mappa.
         */
        public constructor(map: L.Map) {
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
                iconCreateFunction: (cluster: L.MarkerClusterGroup) => {
                    return L.divIcon({
                        html: "<strong>" + cluster.getChildCount() + "</strong>",
                        className: "foiCluster", iconSize: L.point(40, 40)
                    });
                },
                spiderfyDistanceMultiplier: 2, showCoverageOnHover: false, zoomToBoundsOnClick: false
            });
            this.markers.on("clusterclick", (a: any) => {
                a.layer.spiderfy();
                var markers: L.Marker[] = a.layer.getAllChildMarkers();
                for (let i = 0; i < markers.length; ++i) {
                    markers[i].openPopup();
                }
            });
        }

        /**
         * Aggiunge un marker ad una mappa.
         * @param dati Posizione del marker
         */
        addMarker(dati: L.LatLng): void {
            if (this.first) {
                if (this.centerMe) {
                    this.map.setView(dati, 17);
                }
                this.first = false;
            } else {
                this.map.removeLayer(this.myPositionMarker);
            }
            this.myPositionMarker = L.circleMarker(dati, { radius: 10 }).addTo(this.map);
        }

        /**
         * Aggiunge un FOI alla mappa
         * @param dati FOI
         */
        addFoi(dati: Entity.FoiCollection): void {
            for (let i = 0; i < dati.length; ++i) {
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
        }

        /**
         * Aggiunge un POI alla pamma
         * @param dati POI
         */
        addPoi(dati: Entity.PoiCollection): void {
            for (let i = 0; i < dati.length; ++i) {
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
        }

        /**
         * Aggiunge una news alla pamma
         * @param dati Posizione della news
         */
        addNews(dati: any[]) {
            for (let i = 0; i < dati.length; ++i) {
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
        }


        addHold(pos: L.LatLng) {
            if (this.clicked) {
                this.map.removeLayer(this.clicked);
            }
            this.map.setView(pos, 15);
            this.clicked = L.circleMarker(pos, { radius: 10, color: "red" }).addTo(this.map);
        }

        removeMarkers() {
            this.map.removeLayer(this.markers);
        }
    }
}