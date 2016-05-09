namespace Controller {
    "use strict";
    export class Connection {
        private request_time: number;

        public constructor() {
            this.request_time = 0;
        }
        /**
         * Controlla se è possibile stabilire una connessione nei confronti di OpenStreetMap.
         * @param x Numero di tentativi da effettuare.
         */
        public checkConnection(x: number) {
            for (let i: number = 1; i < x + 1; ++i) {
                let start_time: number = new Date().getTime();
                $.ajax({
                    url: "http://c.tile.openstreetmap.fr/hot/9/" + i + "/" + i + ".png",
                    type: "GET",
                    async: false,
                    mimeType: "image/png",
                    cache: false,
                    accepts: "image/webp,image/*,*/*;q=0.8",
                    success: () => {
                        this.request_time += (new Date().getTime() - start_time);
                        if (i === x) {
                            this.request_time = this.request_time / i;
                            console.log("tempo medio di " + i + " richieste: " + this.request_time);
                        }
                    },
                    error: () => {
                        console.log("errore richiesta ajax");
                    }
                });
            }
        };

        /**
         * Cleares cache
         */
        public clearCache(offlineLayer: OfflineLayer) {
            /* var success = function(status) {
                 alert('cache pulita');
             }
        
             var error = function(status) {
                 alert('Errore nella pulizia..');
             }
        
             window.cache.clear( success, error );*/
            offlineLayer.redraw();
        }
    }
}