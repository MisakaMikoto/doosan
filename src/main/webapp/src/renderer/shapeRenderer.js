/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class ShapeRenderer extends Renderer {
    constructor() {
        super();
    }

    render(canvas, object) {
        canvas.drawShape([object.x, object.y], this.shape, [object.width, object.height]);
    }
}