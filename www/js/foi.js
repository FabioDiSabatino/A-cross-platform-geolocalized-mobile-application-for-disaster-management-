$.get("scheda-foi.tmpl", function (template) {
    for (var x in data.foi) {
        var html = Mustache.to_html(template, data.foi[x]);
        $(".content-foi").append(html);
    }
});

var sortNearest = function (dati) {
    var arr = dati.foi;
    var len = arr.length;
    arr.sort(function (a, b) {
        return parseFloat(a.distanza) - parseFloat(b.distanza);
    });
    return arr;
}

var sortLatestFoi = function (dati) {
    var arr = dati.foi;
    var len = arr.length;
    arr.sort(function (a, b) {
        return parseFloat(b.ora_stato) - parseFloat(a.ora_stato);
    });

    return arr;
}


$("#back-from-foi").on("touchstart MSPointerDown click", function () {
    if (typeof map != 'undefined')
    {
        chome.mux({ task: 'stopMap' });
    }
    $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
});



$(".latest").on("touchstart MSPointerDown click", function () {
    //riordino schede o centra mappa in base al più vicino
    data.foi = sortLatestFoi(data);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") { //mi trovo nella schermata a lista
        $.get("scheda-foi.tmpl", function (template) {

            $(".foi-list").remove();
            for (var x in data.foi) {
                var html = Mustache.to_html(template, data.foi[x]);

                $(".content-foi").append(html);
            }
        });
    }
    else {//mi trovo nella schermata a mappa
        chome.mux({ task: "centerView", pack: data.foi[0].position });
    }
    $(".check-latest").addClass("active");
    $(".check-nearest").removeClass("active");
    $(".check-seriousness").removeClass("active");
});

$(".seriousness").on("touchstart MSPointerDown click", function () {
    // riordino schede o centra la mappa in base alla gravità
    data.foi = sortSeriousness(data);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") {
        $.get("scheda-foi.tmpl", function (template) {
            $(".foi-list").remove();
            for (var x in data.foi) {
                var html = Mustache.to_html(template, data.foi[x]);
                $(".content-foi").append(html);
            }
        });
    }
    else {
        chome.mux({ task: "centerView", pack: data.foi[0].position });
    }
    $(".check-nearest").removeClass("active");
    $(".check-latest").removeClass("active");
    $(".check-seriousness").addClass("active");
});

$(".nearest").on("touchstart MSPointerDown click", function () {
    //riordino schede o centra mappa in base al più vicino
    data.foi = sortNearest(data);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") { //mi trovo nella schermata a lista
        $.get("scheda-foi.tmpl", function (template) {
            $(".foi-list").remove();
            for (var x in data.foi) {
                var html = Mustache.to_html(template, data.foi[x]);
                $(".content-foi").append(html);
            }
        });

    }
    else {//mi trovo nella schermata a mappa
        chome.mux({ task: "centerView", pack: data.foi[0].position });
    }
    $(".check-nearest").addClass("active");
    $(".check-latest").removeClass("active");
    $(".check-seriousness").removeClass("active");
});

$(".lista-foi").on("touchstart MSPointerDown click", function () {
    $.get("scheda-foi.tmpl", function (template) {
        $(".map-foi").remove();
        if ($(".check-nearest").hasClass("active")) {
            //ordina in base al più vicino
            data.foi = sortNearest(data);
        }
        else {
            //ordina al più grave
            data.foi = sortSeriousness(data);
        }
        chome.mux({ task: 'stopMap' });
        for (var x in data.foi) {
            var html = Mustache.to_html(template, data.foi[x]);
            $(".content-foi").append(html);
        }
    });
    $(".titolo-filtri").text("Order by:")
    //ordina la lista in base al filtro selezionato precedente

});

$(".mappa-foi").on("touchstart MSPointerDown click", function () {
    $.get("mappa-foi.html", function (template) {
        $(".foi-list").remove();
        $(".content-foi").append(template);
        vhome.mux({ task: 'init' });
        vhome.mux({ task: 'noCenterMe' });
        chome.mux({ task: 'init' });
        vhome.mux({ task: 'addFoi', pack: data.foi });
        map.on("load", function () {
            chome.mux({ task: "centerView", pack: data.foi[0].position });
        })
    });
    $(".titolo-filtri").text("Center view on:");
});