var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var poiSorting;
(function (poiSorting) {
    poiSorting[poiSorting["reportNumber"] = 0] = "reportNumber";
    poiSorting[poiSorting["nearest"] = 1] = "nearest";
    poiSorting[poiSorting["latest"] = 2] = "latest";
})(poiSorting || (poiSorting = {}));
var Entity;
(function (Entity) {
    "use strict";
    var PoiCollection = (function (_super) {
        __extends(PoiCollection, _super);
        function PoiCollection() {
            _super.apply(this, arguments);
            this.currentSorting = null;
        }
        Object.defineProperty(PoiCollection.prototype, "CurrentSorting", {
            get: function () {
                return this.currentSorting;
            },
            enumerable: true,
            configurable: true
        });
        PoiCollection.prototype.sortByReportNumber = function () {
            this.currentSorting = poiSorting.reportNumber;
            this.sort(function (a, b) {
                return b.ReportNumber - a.ReportNumber;
            });
        };
        ;
        PoiCollection.prototype.sortByNearest = function () {
            this.currentSorting = poiSorting.nearest;
            this.sort(function (a, b) {
                return a.Distance - b.Distance;
            });
        };
        ;
        PoiCollection.prototype.sortByLatestUpdate = function () {
            this.currentSorting = poiSorting.latest;
            this.sort(function (a, b) {
                return a.LatestUpdate.getTime() - b.LatestUpdate.getTime();
            });
        };
        ;
        PoiCollection.parseJSON = function (poiJSON) {
            var returns = new PoiCollection(poiJSON.length);
            for (var i = 0; i < poiJSON.length; ++i) {
                returns.push(new Entity.Poi(poiJSON[i].id, poiJSON[i].name, poiJSON[i].emergency, poiJSON[i].latestUpdate, poiJSON[i].distance, poiJSON[i].position.zero, poiJSON[i].position.cell, poiJSON[i].reportNumber));
            }
            return returns;
        };
        return PoiCollection;
    }(Array));
    Entity.PoiCollection = PoiCollection;
})(Entity || (Entity = {}));
//# sourceMappingURL=PoiCollection.js.map