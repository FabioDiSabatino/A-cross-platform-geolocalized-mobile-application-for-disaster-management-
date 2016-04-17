$(".ripristina").on("touchstart MSPointerDown click", function () {
    $('.cell-segnala').siblings().children().children().children().removeClass("active text-active");
    $(".sendsignal").addClass('hidden');
});

$("#back-from-segnala").on("touchstart MSPointerDown click", function () {
    $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
})

$(".cell-segnala").on("touchstart MSPointerDown click", function () {
    $(this).siblings().children().children().children().removeClass("active text-active");
    $(this).children().children().children().addClass(" active text-active");
    $(".sendsignal").removeClass('hidden');
    $(".content").animate({ scrollTop: $(document).height() }, 1200);

});

$(".mappa").on("touchstart MSPointerDown click", function () {
    $.mobile.pageContainer.pagecontainer("change", "mappa-segnala.html", { role: "page" });
});

$("#camera").on("touchstart MSPointerDown click", function () {
    window.alert("Sorry now it's not possible upload photo because network is overload")
});

$(".chiusa").on("touchstart MSPointerDown click", function () {
    window.history.back();
});