enum statuses {
    Fine,
    SlightlyWounded,
    Injuried,
    Trapped,
    TrappedAndInjuried
}
enum deviceStatuses {
    Powered,
    Online,
    Offline
}
namespace Entity {
    "use strict";
    export class Foi implements ILocalizable {
        private id: number;
        private name: string;
        private picture: string;
        private status: statuses;
        private latestUpdate: Date;
        private distance: number;
        private position: L.LatLng;
        private cell: L.LatLng;
        private deviceStatus: number;
        private lastSeen: Date;


        public constructor(id: number, status: statuses, latestUpdate: number,
            distance: number, position: number[], cell: number[],
            deviceStatus: number, lastSeen: number = Date.now()) {
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

        public get ID(): number {
            return this.id;
        }
        public get Name(): string {
            return this.name;
        }
        public get Picture(): string {
            return this.picture;
        }
        public get StatusCode(): statuses {
            return this.status;
        }
        public set StatusCode(statusCode: statuses) {
            this.status = statusCode;
        }
        public get LatestUpdate(): Date {
            return this.latestUpdate;
        }
        public set LatestUpdate(updateDate: Date) {
            if (this.latestUpdate < updateDate) {
                this.latestUpdate = updateDate;
            }
        }
        public get Distance(): number {
            return this.distance;
        }
        public get Position(): L.LatLng {
            return this.position;
        }
        public get Cell(): L.LatLng {
            return this.cell;
        }
        public get DeviceStatus(): number {
            return this.deviceStatus;
        }
        public set ReportNumber(reports: number) {
            this.deviceStatus = reports;
        }

        /**
         * Tries to fetch FOI Name and Picture from contacts
         * starting from its phone number.
         * I know it's crappy, but it's best implementation
         * I could think with cordova tools.
         */
        private getNameAndPictureByNumber() {
            let found = false;
            let stringId = this.id.toString();
            for (let i = 0; i < Foundation.ContactGetter.contacts.length && !found; ++i) {
                for (let j = 0; j < Foundation.ContactGetter.contacts[i].phoneNumbers.length && !found; ++j) {
                    let phoneNumber: string = Foundation.ContactGetter.contacts[i].phoneNumbers[j].value.replace(/\s+/g, "");
                    let within: number = phoneNumber.indexOf(stringId);
                    // checks that the number in address book is the one
                    // received (with or without country code)
                    if (within !== -1 && within < 4) {
                        found = true;
                        this.name = Foundation.ContactGetter.contacts[i].displayName;
                        // contacts has a picture
                        if (Foundation.ContactGetter.contacts[i].photos !== null) {
                            this.picture = Foundation.ContactGetter.contacts[i].photos[0].value;
                        } else {
                            // default image!
                            this.picture = "img/persone.png";
                        }
                    }
                }
            }
            // whoa! You added a FOI whose number isn't on your address book!
            if (!found) {
                this.name = "+" + this.id;
                // default image!
                this.picture = "img/persone.png";
            }
        }
    }
}