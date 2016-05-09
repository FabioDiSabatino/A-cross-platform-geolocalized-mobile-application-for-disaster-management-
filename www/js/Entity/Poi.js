var emergencies;
(function (emergencies) {
    emergencies[emergencies["CollapsedBuilding"] = 0] = "CollapsedBuilding";
    emergencies[emergencies["Fire"] = 1] = "Fire";
    emergencies[emergencies["Flooding"] = 2] = "Flooding";
    emergencies[emergencies["RoadInterruption"] = 3] = "RoadInterruption";
    emergencies[emergencies["TrappedPerson"] = 4] = "TrappedPerson";
    emergencies[emergencies["InjuriedPerson"] = 5] = "InjuriedPerson";
    emergencies[emergencies["NonSelfSufficientPerson"] = 6] = "NonSelfSufficientPerson";
})(emergencies || (emergencies = {}));
var Entity;
(function (Entity) {
    "use strict";
    var Poi = (function () {
        function Poi(id, name, emergency, latestUpdate, distance, position, cell, reportNumber) {
            this.id = id;
            this.name = name;
            this.emergency = emergency;
            this.latestUpdate = new Date(latestUpdate * 1000);
            this.distance = distance;
            this.position = new L.LatLng(position[0], position[1]);
            this.cell = new L.LatLng(cell[0], cell[1]);
            this.reportNumber = reportNumber;
        }
        Object.defineProperty(Poi.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "Name", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "Picture", {
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "EmergencyCode", {
            get: function () {
                return this.emergency;
            },
            set: function (emergencyCode) {
                this.emergency = emergencyCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "LatestUpdate", {
            get: function () {
                return this.latestUpdate;
            },
            set: function (updateDate) {
                if (this.latestUpdate < updateDate) {
                    this.latestUpdate = updateDate;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "Distance", {
            get: function () {
                return this.distance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "Position", {
            get: function () {
                return this.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "Cell", {
            get: function () {
                return this.cell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Poi.prototype, "ReportNumber", {
            get: function () {
                return this.reportNumber;
            },
            set: function (reports) {
                this.reportNumber = reports;
            },
            enumerable: true,
            configurable: true
        });
        Poi.prototype.saveImage = function (imageFile) {
        };
        return Poi;
    }());
    Entity.Poi = Poi;
})(Entity || (Entity = {}));
//# sourceMappingURL=Poi.js.map