/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class ShapeRenderer extends Renderer {
    constructor() {
        super();
        this._shape = '';
        this._option = '';
    }

    set shape(shape) {
        this._shape = shape;
    }

    get shape() {
        return this._shape;
    }

    set option(option) {
        this._option = option;
    }

    get option() {
        return this._option;
    }

    render() {
        // edge
        if(this.shape instanceof EdgeShape) {
            return this.canvas.drawShape(null, this.shape, null, {'edge-type': 'plain',"arrow-start": "none", "arrow-end": "none" });

        } else {
            this.autoIncreaseCanvasSize(this.shape);
            this.autoIncreaseLaneSize(this.shape);

            return this.canvas.drawShape([this.shape.x, this.shape.y], this.shape, [this.shape.width, this.shape.height], this.option);
        }
    }
}