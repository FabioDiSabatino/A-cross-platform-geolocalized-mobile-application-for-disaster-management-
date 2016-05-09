var Foundation;
(function (Foundation) {
    "use strict";
    var Home = (function () {
        function Home() {
            Foundation.Database.createDb();
        }
        Home.prototype.refrest = function () {
            throw "not implemented yet";
        };
        return Home;
    }());
    Foundation.Home = Home;
})(Foundation || (Foundation = {}));
//# sourceMappingURL=Fhome.js.map