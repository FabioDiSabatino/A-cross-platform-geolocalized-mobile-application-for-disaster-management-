declare var distVincenty: (c1: L.LatLng, c2: L.LatLng) => number;

interface Distance {
    "haversine": number;
    "vincenty"?: number;
}