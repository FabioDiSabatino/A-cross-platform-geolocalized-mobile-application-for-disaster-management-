namespace View {
    "use strict";
    export class Signal implements IPage {
        private selected: emergencies;
        public initialize() {
            $(document).on("pagecontainerchange", (event: JQueryEventObject, pages: any) => {
                if (pages.toPage.children().prop("id") !== "signal") {
                    return;
                }
                document.getElementById("back-from-signal").addEventListener(main.UXEvent, main.navigateBack);
                let listItems = document.getElementsByClassName("cell-signal");
                for (let i = 0; i < listItems.length; ++i) {
                    listItems[i].addEventListener(main.UXEvent, (e: any) => {
                        let listItems: any = document.getElementById("emergencies").children;
                        for (let i = 0; i < listItems.length; ++i) {
                            if (listItems[i].dataset.emergency === e.currentTarget.dataset.emergency) {
                                listItems[i].classList.remove("no-active");
                                listItems[i].classList.add("active");
                                listItems[i].classList.add("text-active");
                                this.selected = parseInt(listItems[i].dataset.emergency, 10);
                            } else {
                                listItems[i].classList.add("no-active");
                                listItems[i].classList.remove("active");
                                listItems[i].classList.remove("text-active");
                            }
                        }
                        $(".content").animate({ scrollTop: $(document).height() }, 1200);
                    });
                }
                document.getElementById("reset").addEventListener(main.UXEvent, () => {
                    let listItems = document.getElementsByClassName("cell-signal");
                    for (let i = 0; i < listItems.length; ++i) {
                        listItems[i].classList.remove("active");
                        listItems[i].classList.remove("text-active");
                    }
                    document.getElementById("send-signal").classList.remove("hidden");
                });
                document.getElementById("map").addEventListener(main.UXEvent, () => {
                    let mapView = main.PageHandlers.existsHandler("signalmap") ?
                        main.PageHandlers.getHandler("signalmap") :
                        main.PageHandlers.addHandler("signalmap", new View.Poi());
                    main.navigateTo("signalmap.html", mapView);
                });
                document.getElementById("camera").addEventListener(main.UXEvent, () => {
                    window.alert("Sorry now it's not possible upload photo because network is overload");
                });
                document.getElementById("closed").addEventListener(main.UXEvent, () => {
                    main.navigateBack();
                });
            });
        }
    }
}