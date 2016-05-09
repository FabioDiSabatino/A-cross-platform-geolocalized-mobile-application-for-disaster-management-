enum poiSorting {
    reportNumber,
    nearest,
    latest
}
namespace Entity {
    "use strict";
    export class PoiCollection extends Array<Poi> {
        private currentSorting: poiSorting = null;
        public get CurrentSorting(): poiSorting {
            return this.currentSorting;
        }

        /**
         * Sorts POI by number of reports
         */
        public sortByReportNumber() {
            this.currentSorting = poiSorting.reportNumber;
            this.sort((a: Poi, b: Poi) => {
                return b.ReportNumber - a.ReportNumber;
            });
        };
        /**
         * Riordino dei POI in base alla distanza
         */
        public sortByNearest() {
            this.currentSorting = poiSorting.nearest;
            this.sort((a: Poi, b: Poi) => {
                return a.Distance - b.Distance;
            });
        };

        /**
         * Riordino dei POI sulla base dell'ultimo update.
         */
        public sortByLatestUpdate() {
            this.currentSorting = poiSorting.latest;
            this.sort((a: Poi, b: Poi) => {
                return a.LatestUpdate.getTime() - b.LatestUpdate.getTime();
            });
        };

        /**
         * Crea una collezione di POI a partire dal JSON ricevuto dal server
         * @param poiJSON JSON ricevuto dal server
         */
        public static parseJSON(poiJSON: Array<any>): PoiCollection {
            var returns = new PoiCollection(poiJSON.length);
            for (let i = 0; i < poiJSON.length; ++i) {
                returns.push(new Poi(poiJSON[i].id, poiJSON[i].name, poiJSON[i].emergency,
                    poiJSON[i].latestUpdate, poiJSON[i].distance, poiJSON[i].position.zero,
                    poiJSON[i].position.cell, poiJSON[i].reportNumber));
            }
            return returns;
        }
    }
}