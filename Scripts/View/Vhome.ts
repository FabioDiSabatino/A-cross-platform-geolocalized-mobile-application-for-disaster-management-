namespace View {
    "use strict";
    export class Home {
        private map: View.Map;
        public constructor() {
            this.map = new Map(main.CHome.Map);
        }
        public getMarkerPosition() {
            // return maps.getMarkerPosition();
        }
        public addMe(pack: L.LatLng) {
            this.map.addMarker(pack);
        }
        public addFoi(pack: Entity.FoiCollection) {
            this.map.addFoi(pack);
        }
        public addPoi(pack: Entity.PoiCollection) {
            this.map.addPoi(pack);
        }
        public addNews(pack) {
            this.map.addNews(pack);
        }
        public stopLocate() {
            this.map.CenterMe = true;
            this.map.First = true;
        }
        public noCenterMe() {
            this.map.CenterMe = false;
        }
        public tapHold(pack: L.LatLng) {
            this.map.addHold(pack);
        }
        public clearMap() {
            this.map.removeMarkers();
        }
    }
}