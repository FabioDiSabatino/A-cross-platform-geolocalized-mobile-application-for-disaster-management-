var Controller;
(function (Controller) {
    "use strict";
    var Connection = (function () {
        function Connection() {
            this.request_time = 0;
        }
        Connection.prototype.checkConnection = function (x) {
            var _this = this;
            var _loop_1 = function(i) {
                var start_time = new Date().getTime();
                $.ajax({
                    url: "http://c.tile.openstreetmap.fr/hot/9/" + i + "/" + i + ".png",
                    type: "GET",
                    async: false,
                    mimeType: "image/png",
                    cache: false,
                    accepts: "image/webp,image/*,*/*;q=0.8",
                    success: function () {
                        _this.request_time += (new Date().getTime() - start_time);
                        if (i === x) {
                            _this.request_time = _this.request_time / i;
                            console.log("tempo medio di " + i + " richieste: " + _this.request_time);
                        }
                    },
                    error: function () {
                        console.log("errore richiesta ajax");
                    }
                });
            };
            for (var i = 1; i < x + 1; ++i) {
                _loop_1(i);
            }
        };
        ;
        Connection.prototype.clearCache = function (offlineLayer) {
            offlineLayer.redraw();
        };
        return Connection;
    }());
    Controller.Connection = Connection;
})(Controller || (Controller = {}));
//# sourceMappingURL=Cconnection.js.map