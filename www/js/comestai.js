$(".cell-stato").on(window.UXEvent, function () {
    $(this).siblings().children().children().children().addClass("no-active").removeClass("text-active");
    $(this).children().children().children().removeClass("no-active").addClass("text-active");
});

$("#back-from-comestai").on(window.UXEvent, function () {
    $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
});

$("#pubblica-comestai").on(window.UXEvent, function () {
    if ($(".cell-stato").children().children().children().hasClass("text-active")) {
        window.alert("Una squadra di soccorso arriverà il prima possibile")
    }
    else {
        window.alert("seleziona prima il tuo stato")
    }
});

