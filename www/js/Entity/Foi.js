var statuses;
(function (statuses) {
    statuses[statuses["Fine"] = 0] = "Fine";
    statuses[statuses["SlightlyWounded"] = 1] = "SlightlyWounded";
    statuses[statuses["Injuried"] = 2] = "Injuried";
    statuses[statuses["Trapped"] = 3] = "Trapped";
    statuses[statuses["TrappedAndInjuried"] = 4] = "TrappedAndInjuried";
})(statuses || (statuses = {}));
var deviceStatuses;
(function (deviceStatuses) {
    deviceStatuses[deviceStatuses["Powered"] = 0] = "Powered";
    deviceStatuses[deviceStatuses["Online"] = 1] = "Online";
    deviceStatuses[deviceStatuses["Offline"] = 2] = "Offline";
})(deviceStatuses || (deviceStatuses = {}));
var Entity;
(function (Entity) {
    "use strict";
    var Foi = (function () {
        function Foi(id, status, latestUpdate, distance, position, cell, deviceStatus, lastSeen) {
            if (lastSeen === void 0) { lastSeen = Date.now(); }
            this.id = id;
            this.status = status;
            this.latestUpdate = new Date(latestUpdate * 1000);
            this.distance = distance;
            this.position = new L.LatLng(position[0], position[1]);
            this.cell = new L.LatLng(cell[0], cell[1]);
            this.deviceStatus = deviceStatus;
            this.lastSeen = new Date(lastSeen * 1000);
            this.getNameAndPictureByNumber();
        }
        Object.defineProperty(Foi.prototype, "ID", {
            get: function () {
                return this.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "Name", {
            get: function () {
                return this.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "Picture", {
            get: function () {
                return this.picture;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "StatusCode", {
            get: function () {
                return this.status;
            },
            set: function (statusCode) {
                this.status = statusCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "LatestUpdate", {
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
        Object.defineProperty(Foi.prototype, "Distance", {
            get: function () {
                return this.distance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "Position", {
            get: function () {
                return this.position;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "Cell", {
            get: function () {
                return this.cell;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "DeviceStatus", {
            get: function () {
                return this.deviceStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Foi.prototype, "ReportNumber", {
            set: function (reports) {
                this.deviceStatus = reports;
            },
            enumerable: true,
            configurable: true
        });
        Foi.prototype.getNameAndPictureByNumber = function () {
            var found = false;
            var stringId = this.id.toString();
            for (var i = 0; i < Foundation.ContactGetter.contacts.length && !found; ++i) {
                for (var j = 0; j < Foundation.ContactGetter.contacts[i].phoneNumbers.length && !found; ++j) {
                    var phoneNumber = Foundation.ContactGetter.contacts[i].phoneNumbers[j].value.replace(/\s+/g, "");
                    var within = phoneNumber.indexOf(stringId);
                    if (within !== -1 && within < 4) {
                        found = true;
                        this.name = Foundation.ContactGetter.contacts[i].displayName;
                        if (Foundation.ContactGetter.contacts[i].photos !== null) {
                            this.picture = Foundation.ContactGetter.contacts[i].photos[0].value;
                        }
                        else {
                            this.picture = "img/persone.png";
                        }
                    }
                }
            }
            if (!found) {
                this.name = "+" + this.id;
                this.picture = "img/persone.png";
            }
        };
        return Foi;
    }());
    Entity.Foi = Foi;
})(Entity || (Entity = {}));
//# sourceMappingURL=Foi.js.map