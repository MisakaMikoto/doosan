/**
 * Created by uengine on 2016. 7. 28..
 */
class ActivityShape extends OG.shape.RectangleShape {
    constructor(name) {
        super(name);
    }

    createShape() {
        if (this.geom) {
            return this.geom;
        }

        this.geom = new OG.geometry.Rectangle([0, 0], 200, 200);
        this.geom.style = new OG.geometry.Style({
            'fill': 'none',
            'stroke': '#000000',
            'stroke-width': 2,
            'stroke-linecap': 'round',
            'stroke-linejoin': 'miter',
            'stroke-miterlimit': 10,
            'stroke-dasharray': 'none',
            'stroke-opacity': 1
        });

        return this.geom;
    }
}