namespace Controller {
    "use strict";
    export class Home {
        private map: Controller.Map;
        get Map(): L.Map {
            return this.map.Map;
        }
        public constructor() {
            this.map = new Map();
        }
        public start() {
            // maps.startLocate();
        }
        public stop() {
            this.map.stopMap();
        }
        public centerView(pack: Entity.ILocalizable) {
            this.map.centerView(Grid.coordFromCell(pack));
        }
        public tapHold() {
            this.map.tapHold();
        }
    }
}