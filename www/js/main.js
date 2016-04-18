var scriptchange = function () {
    var script;
    if ($(".content")[1] == undefined) {
        script = "dashboard";
    }
    else {
        script = $(".content")[1].id;
    }
    switch (script) {
        case "dashboard":
            $.getScript("js/home.js");
            break;
        case "comestai":
            $.getScript("js/comestai.js");
            break;
        case "segnala":
            $.getScript("js/segnala.js");
            break;
        case "pubblica-segnala":
            $.getScript("js/mappa-segnala.js");
            break;
        case "foi":
            $.getScript("js/foi.js");
            break;
        case "poi":
            $.getScript("js/poi.js");
            break;
        case "map-widget":
            $.getScript("js/map.js");
            break;
    }
}

document.addEventListener("deviceready", function () {
    $(scriptchange());
    // ottiene lo script specifico ogni volta che viene cambiata una pagina
    $(document).on("pagecontainerchange", scriptchange);
    //comportamento alla pressione del tasto indietro
    document.addEventListener("backbutton", function () {
        if ($(".content")[1] != undefined) {
            $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
        }
    }, false);
    window.UXEvent;
    if ("ontouchstart" in window) {
        //iOS, Android & W10
        window.UXEvent = "touchstart";
    } else if ("MSPointerDown" in window) {
        //Windows Phone 8
        window.UXEvent = "MSPointerDown";
    } else {
        window.UXEvent = "click";
    }
}, false);
