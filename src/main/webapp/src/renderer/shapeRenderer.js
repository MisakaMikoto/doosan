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

    render(canvas) {
        return canvas.drawShape([this.shape.x, this.shape.y], this.shape, [this.shape.width, this.shape.height]);
    }
}