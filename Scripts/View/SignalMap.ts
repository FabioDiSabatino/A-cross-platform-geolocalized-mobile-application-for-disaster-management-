namespace View {
    "use strict";
    export class SignalMap implements IPage {
        public initialize() {
            main.CHome.tapHold();
            main.VHome.noCenterMe();
            document.getElementById("back-from-publish-segnal").addEventListener(main.UXEvent, this.goBack);
            document.getElementById("close").addEventListener(main.UXEvent, this.goBack);
        }

        private goBack() {
            main.CHome.stop();
            main.navigateBack();
        }
    }
}
