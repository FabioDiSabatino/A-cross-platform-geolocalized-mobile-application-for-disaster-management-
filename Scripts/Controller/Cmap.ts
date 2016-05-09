namespace Controller {
    "use strict";
    export class Map {
        private map: L.Map;
        get Map(): L.Map {
            return this.map;
        }
        private offlineLayer: OfflineLayer;

        public constructor() {
            this.map = L.map("map");
            this.offlineLayer = new OfflineLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors Tiles © HOT",
                    onReady: () => {
                        this.map.addLayer(this.offlineLayer);
                        this.map.locate({
                            watch: true,
                            enableHighAccuracy: true,
                            timeout: 500,
                        });
                    },
                    onError: () => { console.log("errore db"); },
                    dbOption: "IndexedDB"
                });

            let onLocationFound = (e: L.LeafletLocationEvent) => {
                console.log("localizzato!!");
                main.VHome.addMe(e.latlng);
                var cell_data = Grid.calcCell(e.latlng);
                console.log("dati griglia:");
                console.log(cell_data);
                Foundation.Database.savePosition(cell_data);
            };

            let onLocationError = () => {
                this.map.setView(L.latLng(42.36, 13.412), 12);
            };

            this.map.on("locationfound", onLocationFound);
            this.map.on("locationerror", onLocationError);

            $("#button_grid").on(main.UXEvent, () => {
                alert("disegno la griglia...");
            });

            $("#button_save").on(main.UXEvent, () => {
                this.saveMap();
            });

        }

        public saveMap() {
            this.offlineLayer.saveTiles(17, () => { console.log("salvataggio in corso..."); },
                () => { console.log("salvataggio completato!"); },
                () => { console.log("errore!"); });
        }

        public stopMap() {
            this.map.stopLocate();
            this.map.off("load");
            main.VHome.stopLocate();
        }

        public centerView(coordinates: L.LatLng) {
            this.map.setView(coordinates, 18);
        }

        public tapHold() {
            this.map.on("taphold", (e: L.LeafletLocationEvent) => {
                main.VHome.tapHold(e.latlng);
            });
        }
    }
}