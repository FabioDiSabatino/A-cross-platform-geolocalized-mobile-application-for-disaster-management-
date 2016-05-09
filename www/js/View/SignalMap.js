var View;
(function (View) {
    "use strict";
    var SignalMap = (function () {
        function SignalMap() {
        }
        SignalMap.prototype.initialize = function () {
            main.CHome.tapHold();
            main.VHome.noCenterMe();
            document.getElementById("back-from-publish-segnal").addEventListener(main.UXEvent, this.goBack);
            document.getElementById("close").addEventListener(main.UXEvent, this.goBack);
        };
        SignalMap.prototype.goBack = function () {
            main.CHome.stop();
            main.navigateBack();
        };
        return SignalMap;
    }());
    View.SignalMap = SignalMap;
})(View || (View = {}));
//# sourceMappingURL=SignalMap.js.map