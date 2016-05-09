module Controller {
    "use strict";
    export class Grid {
        /**
         * Tronca latitudine e longitudine della coordinata passata alla cifra specificata
         * nella variabile dimSys, in accordo con l'algoritmo di santiago
         * @param latLng Coordinata da troncare
         */
        public static calcCell(latLng: L.LatLng, dimSys?: number) {
            if (dimSys) {
                var cut = Math.pow(10, dimSys);
            } else {
                var cut = Math.pow(10, 4);
            }
            var coordinates = L.latLng(Math.floor(latLng.lat * cut) / cut, Math.floor(latLng.lng * cut) / cut);
            var perpendicular_lng = L.latLng(Math.floor(coordinates.lat * 1000) / 1000, coordinates.lng);
            var perpendicular_lat = L.latLng(coordinates.lat, Math.floor(coordinates.lng * 1000) / 1000);
            var dist_lat = this.calcDist(coordinates, perpendicular_lng).haversine;
            var dist_lng = this.calcDist(coordinates, perpendicular_lat).haversine;
            var cell = [Math.floor(dist_lat / 22), Math.floor(dist_lng / 16)];
            return ([{ zero: L.latLng(perpendicular_lat.lat, perpendicular_lng.lng) }, cell]);
        }

        /**
         * Ottiene le coordinate a partire dalla cella
         * @param data
         */
        public static coordFromCell(data: Entity.ILocalizable) {
            var result = L.latLng(data.Position.lat + 0.0001 + (data.Cell.lat * 0.0001 * 2),
                data.Position.lng + 0.0001 + (data.Cell.lng * 0.0001 * 2));
            return result;
        }

        /**
         * Calcola la distanza tra due cordinate col metodo Haversine e, opzionalmente, con
         * il metodo Vincenty.
         * @param c1 Prima coordinata
         * @param c2 Seconda coordinata
         * @param vincenty Soecifica se utilizzare anche il metodo Vincenty o meno.
         */
        public static calcDist(c1: L.LatLng, c2: L.LatLng, vincenty?: boolean): Distance {
            // type se uguale a vincenty il metodo utilizza i due algoritmi e restituisce un 
            // un array con le due distanze
            if (vincenty) {
                console.log("utilizzo anche il metodo di vincenty..");
                return { "haversine": c1.distanceTo(c2), "vincenty": distVincenty(c1, c2) };
            } else {
                return { "haversine": c1.distanceTo(c2) };
            }
        }
    }
}