enum emergencies {
    CollapsedBuilding,
    Fire,
    Flooding,
    RoadInterruption,
    TrappedPerson,
    InjuriedPerson,
    NonSelfSufficientPerson
}
namespace Entity {
    "use strict";
    export class Poi implements ILocalizable {
        private id: string;
        private name: string;
        private emergency: emergencies;
        private latestUpdate: Date;
        private distance: number;
        private position: L.LatLng;
        private cell: L.LatLng;
        private reportNumber: number;

        public constructor(id: string, name: string, emergency: emergencies,
            latestUpdate: number, distance: number, position: number[], cell: number[], reportNumber: number) {
            this.id = id;
            this.name = name;
            this.emergency = emergency;
            this.latestUpdate = new Date(latestUpdate*1000);
            this.distance = distance;
            this.position = new L.LatLng(position[0], position[1]);
            this.cell = new L.LatLng(cell[0], cell[1]);
            this.reportNumber = reportNumber;
        }

        public get ID(): string {
            return this.id;
        }
        public get Name(): string {
            return this.name;
        }
        public get Picture() {
            // recuperare immagine da database in blob/file
            return null;
        }
        public get EmergencyCode(): emergencies {
            return this.emergency;
        }
        public set EmergencyCode(emergencyCode: emergencies) {
            this.emergency = emergencyCode;
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
        public get ReportNumber(): number {
            return this.reportNumber;
        }
        public set ReportNumber(reports: number) {
            this.reportNumber = reports;
        }
        public saveImage(imageFile: FileEntry) {
            // salvare su database un blob
        }
    }
}