var View;
(function (View) {
    "use strict";
    var Home = (function () {
        function Home() {
            this.map = new View.Map(main.CHome.Map);
        }
        Home.prototype.getMarkerPosition = function () {
        };
        Home.prototype.addMe = function (pack) {
            this.map.addMarker(pack);
        };
        Home.prototype.addFoi = function (pack) {
            this.map.addFoi(pack);
        };
        Home.prototype.addPoi = function (pack) {
            this.map.addPoi(pack);
        };
        Home.prototype.addNews = function (pack) {
            this.map.addNews(pack);
        };
        Home.prototype.stopLocate = function () {
            this.map.CenterMe = true;
            this.map.First = true;
        };
        Home.prototype.noCenterMe = function () {
            this.map.CenterMe = false;
        };
        Home.prototype.tapHold = function (pack) {
            this.map.addHold(pack);
        };
        Home.prototype.clearMap = function () {
            this.map.removeMarkers();
        };
        return Home;
    }());
    View.Home = Home;
})(View || (View = {}));
//# sourceMappingURL=Vhome.js.map