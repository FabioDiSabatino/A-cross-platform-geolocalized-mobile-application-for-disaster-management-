var Controller;
(function (Controller) {
    "use strict";
    var Grid = (function () {
        function Grid() {
        }
        Grid.calcCell = function (latLng, dimSys) {
            if (dimSys) {
                var cut = Math.pow(10, dimSys);
            }
            else {
                var cut = Math.pow(10, 4);
            }
            var coordinates = L.latLng(Math.floor(latLng.lat * cut) / cut, Math.floor(latLng.lng * cut) / cut);
            var perpendicular_lng = L.latLng(Math.floor(coordinates.lat * 1000) / 1000, coordinates.lng);
            var perpendicular_lat = L.latLng(coordinates.lat, Math.floor(coordinates.lng * 1000) / 1000);
            var dist_lat = this.calcDist(coordinates, perpendicular_lng).haversine;
            var dist_lng = this.calcDist(coordinates, perpendicular_lat).haversine;
            var cell = [Math.floor(dist_lat / 22), Math.floor(dist_lng / 16)];
            return ([{ zero: L.latLng(perpendicular_lat.lat, perpendicular_lng.lng) }, cell]);
        };
        Grid.coordFromCell = function (data) {
            var result = L.latLng(data.Position.lat + 0.0001 + (data.Cell.lat * 0.0001 * 2), data.Position.lng + 0.0001 + (data.Cell.lng * 0.0001 * 2));
            return result;
        };
        Grid.calcDist = function (c1, c2, vincenty) {
            if (vincenty) {
                console.log("utilizzo anche il metodo di vincenty..");
                return { "haversine": c1.distanceTo(c2), "vincenty": distVincenty(c1, c2) };
            }
            else {
                return { "haversine": c1.distanceTo(c2) };
            }
        };
        return Grid;
    }());
    Controller.Grid = Grid;
})(Controller || (Controller = {}));
//# sourceMappingURL=Cgrid.js.map