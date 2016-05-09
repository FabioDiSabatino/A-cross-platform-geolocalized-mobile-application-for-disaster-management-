var Controller;
(function (Controller) {
    "use strict";
    var Device = (function () {
        function Device() {
        }
        Device.getInfo = function () {
            return {
                ratio: window.devicePixelRatio,
                height: screen.height,
                width: screen.width,
                platform: device.platform,
                orientation: window.orientation
            };
        };
        return Device;
    }());
    Controller.Device = Device;
})(Controller || (Controller = {}));
//# sourceMappingURL=Cdevice.js.map