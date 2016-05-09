var Controller;
(function (Controller) {
    "use strict";
    var Map = (function () {
        function Map() {
            var _this = this;
            this.map = L.map("map");
            this.offlineLayer = new OfflineLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors Tiles © HOT",
                onReady: function () {
                    _this.map.addLayer(_this.offlineLayer);
                    _this.map.locate({
                        watch: true,
                        enableHighAccuracy: true,
                        timeout: 500,
                    });
                },
                onError: function () { console.log("errore db"); },
                dbOption: "IndexedDB"
            });
            var onLocationFound = function (e) {
                console.log("localizzato!!");
                main.VHome.addMe(e.latlng);
                var cell_data = Controller.Grid.calcCell(e.latlng);
                console.log("dati griglia:");
                console.log(cell_data);
                Foundation.Database.savePosition(cell_data);
            };
            var onLocationError = function () {
                _this.map.setView(L.latLng(42.36, 13.412), 12);
            };
            this.map.on("locationfound", onLocationFound);
            this.map.on("locationerror", onLocationError);
            $("#button_grid").on(main.UXEvent, function () {
                alert("disegno la griglia...");
            });
            $("#button_save").on(main.UXEvent, function () {
                _this.saveMap();
            });
        }
        Object.defineProperty(Map.prototype, "Map", {
            get: function () {
                return this.map;
            },
            enumerable: true,
            configurable: true
        });
        Map.prototype.saveMap = function () {
            this.offlineLayer.saveTiles(17, function () { console.log("salvataggio in corso..."); }, function () { console.log("salvataggio completato!"); }, function () { console.log("errore!"); });
        };
        Map.prototype.stopMap = function () {
            this.map.stopLocate();
            this.map.off("load");
            main.VHome.stopLocate();
        };
        Map.prototype.centerView = function (coordinates) {
            this.map.setView(coordinates, 18);
        };
        Map.prototype.tapHold = function () {
            this.map.on("taphold", function (e) {
                main.VHome.tapHold(e.latlng);
            });
        };
        return Map;
    }());
    Controller.Map = Map;
})(Controller || (Controller = {}));
//# sourceMappingURL=Cmap.js.map