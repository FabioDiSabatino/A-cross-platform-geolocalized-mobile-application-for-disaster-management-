var Controller;
(function (Controller) {
    "use strict";
    var PageHandler = (function () {
        function PageHandler() {
            this.pageName = [];
            this.pageHandler = [];
        }
        PageHandler.prototype.addHandler = function (pageName, pageHandler) {
            if (this.existsHandler(pageName)) {
                throw "Already existent handler";
            }
            else {
                this.pageHandler.push(pageHandler);
                this.pageName.push(pageName);
            }
            return pageHandler;
        };
        PageHandler.prototype.getHandler = function (pageName) {
            if (this.existsHandler(pageName)) {
                return this.pageHandler[this.pageName.indexOf(pageName)];
            }
            else {
                throw "Page not initialized yet!";
            }
        };
        PageHandler.prototype.existsHandler = function (pageName) {
            return (this.pageName.indexOf(pageName) !== -1);
        };
        return PageHandler;
    }());
    Controller.PageHandler = PageHandler;
})(Controller || (Controller = {}));
//# sourceMappingURL=PageHandler.js.map