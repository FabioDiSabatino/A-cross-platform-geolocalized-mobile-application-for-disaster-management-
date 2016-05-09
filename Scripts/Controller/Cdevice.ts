namespace Controller {
    "use strict";
    /**
     * Classe utilizzata per il recupero di informazioni sul dispositivo
     * come dimensione, stato ect ...
     */
    export class Device {
        public static getInfo() {
            return {
                ratio: window.devicePixelRatio, // ancomment when build 
                height: screen.height,
                width: screen.width,
                platform: device.platform,
                orientation: window.orientation
            };
        }
    }
}