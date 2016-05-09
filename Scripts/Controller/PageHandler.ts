namespace Controller {
    "use strict";
    export class PageHandler {
        private pageName: string[];
        private pageHandler: View.IPage[];

        public constructor() {
            this.pageName = [];
            this.pageHandler = [];
        }

        public addHandler(pageName: string, pageHandler: View.IPage): View.IPage {
            if (this.existsHandler(pageName)) {
                throw "Already existent handler";
            } else {
                this.pageHandler.push(pageHandler);
                this.pageName.push(pageName);
            }
            return pageHandler;
        }

        public getHandler(pageName: string): View.IPage {
            if (this.existsHandler(pageName)) {
                return this.pageHandler[this.pageName.indexOf(pageName)];
            } else {
                throw "Page not initialized yet!";
            }
        }

        /**
         * Whether an Handler exists for this page or not.
         * @param pagename
         */
        public existsHandler(pageName: string): boolean {
            return (this.pageName.indexOf(pageName) !== -1);
        }
    }
}