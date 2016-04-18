
$("#back-from-pubblica-segnala").on(window.UXEvent, function () {
    cmap.stopMap();
    $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
});
$(".chiusa").on(window.UXEvent, function () {
    cmap.stopMap();
    $.mobile.pageContainer.pagecontainer("change", "segnala.html", { role: "page" });
});

vhome.mux({ task: 'init' });
vhome.mux({ task: 'noCenterMe' });
chome.mux({ task: 'init' });
chome.mux({ task: 'taphold' });
vhome.mux({ task: 'taphold' });