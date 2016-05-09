enum foiSorting {
    latestUpdate,
    nearest,
    seriousness
}
namespace Entity {
    "use strict";
    export class FoiCollection extends Array<Foi> {
        private currentSorting: foiSorting = null;
        private isComplete: boolean;
        public get IsComplete(): boolean {
            return this.isComplete;
        }

        public get CurrentSorting(): foiSorting {
            return this.currentSorting;
        }

        public constructor(length?: number) {
            super(length);
            this.isComplete = false;
            document.addEventListener("foiCreated", () => {
                this.isComplete = true;
            });
        }

        /**
         * Returns most serious FOI.
         * If more than one is found, returns the first one.
         */
        public mostSerious(): Foi {
            var mostSeriousIndex = 0;
            for (let i = 0; i < this.length; ++i) {
                if (this[i].StatusCode === statuses.TrappedAndInjuried) {
                    return this[i];
                }
                if (this[i].StatusCode > this[mostSeriousIndex].StatusCode) {
                    mostSeriousIndex = i;
                }
            }
            return this[mostSeriousIndex];
        }

        /**
         * Ordinamento dei FOI in base alla gravità.
         */
        public sortBySeriousness() {
            this.currentSorting = foiSorting.seriousness;
            this.sort((a: Foi, b: Foi) => {
                return b.StatusCode - a.StatusCode;
            });
        };

        /**
         * Riordino dei FOI in base alla distanza
         */
        public sortByNearest() {
            this.currentSorting = foiSorting.nearest;
            this.sort((a: Foi, b: Foi) => {
                return a.Distance - b.Distance;
            });
        };

        /**
         * Riordino dei FOI sulla base dell'ultimo update.
         */
        public sortByLatestUpdate() {
            this.currentSorting = foiSorting.latestUpdate;
            this.sort((a: Foi, b: Foi) => {
                return a.LatestUpdate.getTime() - b.LatestUpdate.getTime();
            });
        };

        /**
         * Crea una collezione di FOI a partire dal JSON ricevuto dal server
         * @param foiJSON JSON ricevuto dal server
         */
        public static parseJSON(foiJSON: Array<any>): FoiCollection {
            var returns = new FoiCollection(foiJSON.length);
            for (let i = 0; i < foiJSON.length; ++i) {
                if (foiJSON[i].device === deviceStatuses.Online) {
                    returns.push(new Foi(foiJSON[i].id, foiJSON[i].status,
                        foiJSON[i].latestUpdate, foiJSON[i].distance,
                        foiJSON[i].position.zero, foiJSON[i].position.cell, foiJSON[i].device));
                }
                returns.push(new Foi(foiJSON[i].id, foiJSON[i].status,
                    foiJSON[i].latestUpdate, foiJSON[i].distance, foiJSON[i].position.zero,
                    foiJSON[i].position.cell, foiJSON[i].device, foiJSON[i].lastSeen));
            }
            return returns;
        }
    }
}