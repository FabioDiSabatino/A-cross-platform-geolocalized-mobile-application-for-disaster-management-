var Controller;
(function (Controller) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.map = new Controller.Map();
        }
        Object.defineProperty(Home.prototype, "Map", {
            get: function () {
                return this.map.Map;
            },
            enumerable: true,
            configurable: true
        });
        Home.prototype.start = function () {
        };
        Home.prototype.stop = function () {
            this.map.stopMap();
        };
        Home.prototype.centerView = function (pack) {
            this.map.centerView(Controller.Grid.coordFromCell(pack));
        };
        Home.prototype.tapHold = function () {
            this.map.tapHold();
        };
        return Home;
    }());
    Controller.Home = Home;
})(Controller || (Controller = {}));
//# sourceMappingURL=Chome.js.map