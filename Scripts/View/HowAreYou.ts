namespace View {
    "use strict";
    export class HowAreYou implements IPage {
        private selected: statuses;
        public initialize() {
            $(document).on("pagecontainerchange", (event: JQueryEventObject, pages: any) => {
                if (pages.toPage.children().prop("id") !== "howareyou") {
                    return;
                }
                document.getElementById("back-from-howareyou").addEventListener(main.UXEvent, main.navigateBack);
                document.getElementById("publish-howareyou").addEventListener(main.UXEvent, () => {
                    if (typeof this.selected !== "undefined") {
                        window.alert("Una squadra di soccorso arriverà il prima possibile");
                    } else {
                        window.alert("seleziona prima il tuo stato");
                    }
                });
                var listItems = document.querySelectorAll("#statuses > li");
                for (let i = 0; i < listItems.length; ++i) {
                    listItems[i].addEventListener(main.UXEvent, (e: any) => {
                        let listItems: any = document.getElementById("statuses").children;
                        for (let i = 0; i < listItems.length; ++i) {
                            if (listItems[i].dataset.status === e.currentTarget.dataset.status) {
                                listItems[i].classList.remove("no-active");
                                listItems[i].classList.add("text-active");
                                this.selected = parseInt(listItems[i].dataset.status, 10);
                            } else {
                                listItems[i].classList.add("no-active");
                                listItems[i].classList.remove("text-active");
                            }
                        }
                    });
                }
            });
        }
    }
}