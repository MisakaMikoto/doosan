/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class ShapeRenderer extends Renderer {
    constructor() {
        super();

        this._shape = '';
    }

    set shape(shape) {
        this._shape = shape;
    }

    get shape() {
        return this._shape;
    }


    render(canvas, object) {
        return canvas.drawShape([object.x, object.y], this.shape, [object.width, object.height]);
    }
}