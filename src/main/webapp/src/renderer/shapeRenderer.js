/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class ShapeRenderer extends Renderer {
    constructor() {
        super();
    }

    render(canvas) {
        canvas.drawShape([this.x, this.y], this.shape, [this.width, this.height]);
    }
}