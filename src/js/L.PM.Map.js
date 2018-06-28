const Map = L.Class.extend({
    initialize(map) {
        this.map = map;
        this.Draw = new L.PM.Draw(map);

        this.map.on('layerremove', (e) => {
            if (e.layer.pm && !e.layer._pmTempLayer) {
                this.map.fire('pm:remove', e);
            }
        });

        this._globalRemovalMode = false;
    },
    enableDraw(shape = 'Line', options) {
        this.Draw.enable(shape, options);
    },
    disableDraw(shape = 'Line') {
        this.Draw.disable(shape);
    },
    removeLastVertex(shape = 'Line') {
        this.Draw.removeLastVertex(shape);
    },
    setPathOptions(options) {
        this.Draw.setPathOptions(options);
    },
    removeLayer(e) {
        const layer = e.target;
        if (!layer._layers && (!layer.pm || !layer.pm.dragging())) {
            e.target.remove();
        }
    },
    toggleGlobalRemovalMode() {
        // toggle global edit mode
        if (this.globalRemovalEnabled()) {
            this._globalRemovalMode = false;
            this.map.eachLayer((layer) => {
                layer.off('click', this.removeLayer);
            });
        } else {
            this._globalRemovalMode = true;
            this.map.eachLayer((layer) => {
                if (layer.pm && !(layer.pm.options && layer.pm.options.preventMarkerRemoval)) {
                    layer.on('click', this.removeLayer);
                }
            });
        }
    },
    globalRemovalEnabled() {
        return this._globalRemovalMode;
    },
    globalEditEnabled() {
        return this._globalEditMode;
    },
    enableGlobalEditMode(options) {
        // find all layers handled by leaflet.pm
        let layers = [];
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.Circle) {
                layers.push(layer);
            }
        });

        // filter out layers that don't have the leaflet.pm instance
        layers = layers.filter(layer => !!layer.pm);

        // filter out everything that's leaflet.pm specific temporary stuff
        layers = layers.filter(layer => !layer._pmTempLayer);

        this._globalEditMode = true;

        layers.forEach((layer) => {
            layer.pm.enable(options);
        });

        // fire event
        this._fireEditModeEvent(true);
    },
    disableGlobalEditMode() {
        // find all layers handles by leaflet.pm
        let layers = [];
        this.map.eachLayer((layer) => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker || layer instanceof L.Circle) {
                layers.push(layer);
            }
        });

        // filter out layers that don't have the leaflet.pm instance
        layers = layers.filter(layer => !!layer.pm);

        // filter out everything that's leaflet.pm specific temporary stuff
        layers = layers.filter(layer => !layer._pmTempLayer);

        this._globalEditMode = false;

        layers.forEach((layer) => {
            layer.pm.disable();
        });

        // fire event
        this._fireEditModeEvent(false);
    },
    _fireEditModeEvent(enabled) {
        this.map.fire('pm:globaleditmodetoggled', {
            enabled,
            map: this.map,
        });
    },
    toggleGlobalEditMode(options) {
        // console.log('toggle global edit mode', options);
        if (this.globalEditEnabled()) {
            // disable
            this.disableGlobalEditMode();
        } else {
            // enable
            this.enableGlobalEditMode(options);
        }
    },
});

export default Map;
