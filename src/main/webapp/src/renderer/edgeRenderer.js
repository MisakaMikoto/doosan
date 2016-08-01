/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class EdgeRenderer extends Renderer {
    constructor() {
        super();
    }

    render(canvas, from, to) {
        return canvas.connect(from, to);
    }
}