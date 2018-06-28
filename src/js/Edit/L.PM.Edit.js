const Edit = L.Class.extend({
    options: {},
    isPolygon() {
        // if it's a polygon, it means the coordinates array is multi dimensional
        return this._layer instanceof L.Polygon;
    },
});

export default Edit;
