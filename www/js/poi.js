var sortNumber = function (dati2) {
    //riordino dati2 in ordine decrescente di emergenza
    var arr = dati2.poi;
    var len = arr.length;
    arr.sort(function (a, b) {
        return parseFloat(b.number) - parseFloat(a.number);
    });
    return arr;
};
var sortNearest = function (dati2) {
    var arr = dati2.poi;
    var len = arr.length;
    arr.sort(function (a, b) {
        return parseFloat(a.distanza) - parseFloat(b.distanza);
    });
    return arr;
};


var sortLatest = function (dati2) {
    var arr = dati2.poi;
    var len = arr.length;
    arr.sort(function (a, b) {
        return parseFloat(a.ultimo_ora) - parseFloat(b.ultimo_ora);
    });

    return arr;
};

$("#back-from-poi").on("tap", function () {
    if (typeof map != 'undefined') {
        chome.mux({ task: 'stopMap' });
    }
    $.mobile.pageContainer.pagecontainer("change", "index.html", { role: "page" });
});


$.get("scheda-poi.tmpl", function (template) {
    data2.poi = sortLatest(data2);
    for (var x in data2.poi) {
        var html = Mustache.to_html(template, data2.poi[x]);
        $(".content-poi").append(html);
    }
});



$(".number").on("touchstart MSPointerDown click", function () {
    // riordino schede o centra la mappa in base al numero di segnalazioni
    data2.poi = sortNumber(data2);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") {
        $.get("scheda-poi.tmpl", function (template) {
            $(".poi-list").remove();
            for (var x in data2.poi) {
                var html = Mustache.to_html(template, data2.poi[x]);

                $(".content-poi").append(html);
            }
        });

    }
    else {
        chome.mux({ task: "centerView", pack: data2.poi[0].position });
    }
    $(".check-nearest").removeClass("active");
    $(".check-number").addClass("active");
    $(".check-latest").removeClass("active");


});

$(".nearest").on("touchstart MSPointerDown click", function () {
    //riordino schede o centra mappa in base al più vicino
    data2.poi = sortNearest(data2);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") { //mi trovo nella schermata a lista
        $.get("scheda-poi.tmpl", function (template) {
            $(".poi-list").remove();
            for (var x in data2.poi) {
                var html = Mustache.to_html(template, data2.poi[x]);
                $(".content-poi").append(html);
            }
        });

    }
    else {//mi trovo nella schermata a mappa
        chome.mux({ task: "centerView", pack: data2.poi[0].position });
    }

    $(".check-nearest").addClass("active");
    $(".check-number").removeClass("active");
    $(".check-latest").removeClass("active");
});

$(".latest").on("touchstart MSPointerDown click", function () {
    //riordino schede o centra mappa in base al più vicino
    data2.poi = sortLatest(data2);
    var text = $(".titolo-filtri").text();
    if (text == "Order by:") { //mi trovo nella schermata a lista
        $.get("scheda-poi.tmpl", function (template) {
            $(".poi-list").remove();
            for (var x in data2.poi) {
                var html = Mustache.to_html(template, data2.poi[x]);
                $(".content-poi").append(html);
            }
        });

    }
    else {//mi trovo nella schermata a mappa
        chome.mux({ task: "centerView", pack: data2.poi[0].position });
    }
    $(".check-latest").addClass("active");
    $(".check-nearest").removeClass("active");
    $(".check-number").removeClass("active");
});

$(".mappa-poi").on("touchstart MSPointerDown click", function () {
    $.get("mappa-foi.html", function (template) {
        $(".poi-list").remove();
        $(".content-poi").append(template);
        vhome.mux({ task: 'init' });
        vhome.mux({ task: 'noCenterMe' });
        chome.mux({ task: 'init' });
        vhome.mux({ task: 'addPoi', pack: data2.poi });
        map.on("load", function () {
            chome.mux({ task: "centerView", pack: data2.poi[0].position });
        })
    });
    $(".titolo-filtri").text("Center view on:")
});

$(".lista-poi").on("touchstart MSPointerDown click", function () {
    $.get("scheda-poi.tmpl", function (template) {
        $(".map-foi").remove();
        if ($(".check-nearest").hasClass("active")) {
            //ordina in base al più vicino
            data2.poi = sortNearest(data2);
        }
        else {
            //ordina al più grave
            data2.poi = sortNumber(data2);
        }
        chome.mux({ task: 'stopMap' });
        for (var x in data2.poi) {
            var html = Mustache.to_html(template, data2.poi[x]);
            $(".content-poi").append(html);
        }
    });
    $(".titolo-filtri").text("Order by:")
    //ordina la lista in base al filtro selezionato precedente
});
