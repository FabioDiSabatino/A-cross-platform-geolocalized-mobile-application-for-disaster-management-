interface OfflineLayer extends L.TileLayer {
    saveTiles(zoomLevelLimit: number, onStarted: () => void, onSuccess: () => void, onError: () => void): void;
}

interface OfllineLayerStatic extends L.TileLayerStatic {
    new (urlTemplate: string, options?: L.TileLayerOptions): OfflineLayer;
}

declare var OfflineLayer: OfllineLayerStatic;

declare namespace L {
    export var markerClusterGroup: (opt: MarkerClusterGroupOptions) => MarkerClusterGroup;
}
