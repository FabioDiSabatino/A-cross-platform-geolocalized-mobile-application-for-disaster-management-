var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var foiSorting;
(function (foiSorting) {
    foiSorting[foiSorting["latestUpdate"] = 0] = "latestUpdate";
    foiSorting[foiSorting["nearest"] = 1] = "nearest";
    foiSorting[foiSorting["seriousness"] = 2] = "seriousness";
})(foiSorting || (foiSorting = {}));
var Entity;
(function (Entity) {
    "use strict";
    var FoiCollection = (function (_super) {
        __extends(FoiCollection, _super);
        function FoiCollection(length) {
            var _this = this;
            _super.call(this, length);
            this.currentSorting = null;
            this.isComplete = false;
            document.addEventListener("foiCreated", function () {
                _this.isComplete = true;
            });
        }
        Object.defineProperty(FoiCollection.prototype, "IsComplete", {
            get: function () {
                return this.isComplete;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(FoiCollection.prototype, "CurrentSorting", {
            get: function () {
                return this.currentSorting;
            },
            enumerable: true,
            configurable: true
        });
        FoiCollection.prototype.mostSerious = function () {
            var mostSeriousIndex = 0;
            for (var i = 0; i < this.length; ++i) {
                if (this[i].StatusCode === statuses.TrappedAndInjuried) {
                    return this[i];
                }
                if (this[i].StatusCode > this[mostSeriousIndex].StatusCode) {
                    mostSeriousIndex = i;
                }
            }
            return this[mostSeriousIndex];
        };
        FoiCollection.prototype.sortBySeriousness = function () {
            this.currentSorting = foiSorting.seriousness;
            this.sort(function (a, b) {
                return b.StatusCode - a.StatusCode;
            });
        };
        ;
        FoiCollection.prototype.sortByNearest = function () {
            this.currentSorting = foiSorting.nearest;
            this.sort(function (a, b) {
                return a.Distance - b.Distance;
            });
        };
        ;
        FoiCollection.prototype.sortByLatestUpdate = function () {
            this.currentSorting = foiSorting.latestUpdate;
            this.sort(function (a, b) {
                return a.LatestUpdate.getTime() - b.LatestUpdate.getTime();
            });
        };
        ;
        FoiCollection.parseJSON = function (foiJSON) {
            var returns = new FoiCollection(foiJSON.length);
            for (var i = 0; i < foiJSON.length; ++i) {
                if (foiJSON[i].device === deviceStatuses.Online) {
                    returns.push(new Entity.Foi(foiJSON[i].id, foiJSON[i].status, foiJSON[i].latestUpdate, foiJSON[i].distance, foiJSON[i].position.zero, foiJSON[i].position.cell, foiJSON[i].device));
                }
                returns.push(new Entity.Foi(foiJSON[i].id, foiJSON[i].status, foiJSON[i].latestUpdate, foiJSON[i].distance, foiJSON[i].position.zero, foiJSON[i].position.cell, foiJSON[i].device, foiJSON[i].lastSeen));
            }
            return returns;
        };
        return FoiCollection;
    }(Array));
    Entity.FoiCollection = FoiCollection;
})(Entity || (Entity = {}));
//# sourceMappingURL=FoiCollection.js.map