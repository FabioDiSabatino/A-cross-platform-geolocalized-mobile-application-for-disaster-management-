declare var main: Controller.Main;

namespace Controller {
    "use strict";
    export class Main {
        private foiList: Entity.FoiCollection;
        public get FoiList(): Entity.FoiCollection {
            return this.foiList;
        }
        private poiList: Entity.PoiCollection;
        public get PoiList(): Entity.PoiCollection {
            return this.poiList;
        }
        private uxevent: string;
        private handlers: PageHandler;
        public get PageHandlers(): PageHandler {
            return this.handlers;
        }
        private chome: Controller.Home;
        public get CHome(): Controller.Home {
            return this.chome;
        }
        public set CHome(chome: Controller.Home) {
            if (typeof this.chome !== "undefined") {
                this.chome.Map.remove();
            }
            this.chome = chome;
        }
        private vhome: View.Home;
        public get VHome(): View.Home {
            return this.vhome;
        }
        public set VHome(vhome: View.Home) {
            this.vhome = vhome;
        }

        /**
         * Get current User Navigation event (click, touchstart, MSPointerDown)
         */
        public get UXEvent() {
            return this.uxevent;
        }

        /**
         * A stack containing all navigation history
         */
        private pageStack: string[];

        public constructor() {
            // WARNING: for iOS 7, remove the width=device-width and height=device-height attributes.
            // See https://issues.apache.org/jira/browse/CB-4323
            document.addEventListener("deviceready", () => {
                if (device.platform === "iOS" && parseFloat(device.version) === 7.0) {
                    document.querySelector("meta[name=viewport]").setAttribute("content",
                        "user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1");
                } else {
                    document.querySelector("meta[name=viewport]").setAttribute("content",
                        "user-scalable=no, initial-scale=1, minimum-scale=1, maximum-scale=1, width=device-width, height=device-height");
                }
            }, false);
            this.pageStack = [];
            this.handlers = new PageHandler();
            // comportamento alla pressione del tasto indietro
            document.addEventListener("backbutton", () => {
                // we are NOT on index page.
                if (this.pageStack.length !== 1) {
                    this.navigateBack();
                }
            }, false);
            this.setUXEvent();
            this.setTapHoldEvent();
            let dashboardView = this.handlers.addHandler("dashboard", new View.Dashboard());
            this.navigateTo("dashboard.html", dashboardView);
            // ========================================================
            // soluzioni temporanee
            $.getJSON("foi.json", (jsonFoi: any[]) => {
                Foundation.ContactGetter.initialize();
                document.addEventListener("contactsLoaded", () => {
                    this.foiList = Entity.FoiCollection.parseJSON(jsonFoi);
                    let created = document.createEvent("Event");
                    created.initEvent("foiCreated", true, true);
                    document.dispatchEvent(created);
                    let dash: any = this.handlers.getHandler("dashboard");
                    dash.updateFoiBanner();
                });
            });
            $.getJSON("poi.json", (jsonPoi: any[]) => {
                this.poiList = Entity.PoiCollection.parseJSON(jsonPoi);
            });
            // ========================================================
        }

        /**
         * Navigate no a specific page.
         * @param page Page file name (.html has to be provided).
         * @param pageHandler PageHandler with all specific methods.
         */
        public navigateTo(page: string, pageHandler: View.IPage) {
            // add current page to stack ===============================================================
            // classes and data-url are defined by jQuery Mobile
            var currentlyShownPages: any = document.getElementsByClassName("ui-page");
            var absoluteUrl: string = currentlyShownPages[currentlyShownPages.length - 1].dataset.url;
            this.pageStack.push(absoluteUrl.slice(absoluteUrl.lastIndexOf("/") + 1));
            // then navigates to new page ==============================================================
            $.mobile.pageContainer.pagecontainer("change", page, { changeHash: false, role: "page" });
            pageHandler.initialize();
        }

        /**
         * Navigates one page back.
         */
        public navigateBack() {
            $.mobile.pageContainer.pagecontainer("change", main.pageStack.pop(), { changeHash: false, role: "page" });
        }

        private setUXEvent() {
            if ("ontouchstart" in window) {
                // iOS, Android & W10
                this.uxevent = "touchstart";
            } else if ("MSPointerDown" in window) {
                // windows phone 8
                this.uxevent = "MSPointerDown";
            } else {
                this.uxevent = "click";
            }
        }

        /**
         * Cretes Tap & Hold Event and fires it when catched.
         * If on desktop, tap-hold is replaced with right-click.
         */
        private setTapHoldEvent() {
            if (this.uxevent === "touchstart") {
                let startTime: number;
                let endTime: number;
                let gbMove: boolean;
                document.addEventListener("touchstart", (event: TouchEvent) => {
                    startTime = new Date().getTime();
                    gbMove = false;
                }, false);

                document.addEventListener("touchmove", (event: TouchEvent) => {
                    gbMove = true;
                }, false);

                document.addEventListener("touchend", (event: TouchEvent) => {
                    endTime = new Date().getTime();
                    if (!gbMove && (endTime - startTime) / 1000 > 2) {
                        let taphold = document.createEvent("Event");
                        taphold.initEvent("taphold", true, true);
                        document.dispatchEvent(taphold);
                    }
                }, false);
            } else {
                document.addEventListener("mousedown", (e: MouseEvent) => {
                    if (e.which === 3) {
                        let taphold = document.createEvent("Event");
                        taphold.initEvent("taphold", true, true);
                        document.dispatchEvent(taphold);
                    }
                });
            }
        }
    }
}


document.addEventListener("deviceready", () => {
    main = new Controller.Main();
}, false);