/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class EdgeRenderer extends Renderer {
    constructor() {
        super();

        this._from = '';
        this._to = '';
    }

    set from(from) {
        this._from = from;
    }

    get from() {
        return this._from;
    }

    set to(to) {
        this._to = to;
    }

    get to() {
        return this._to;
    }

    render() {
        return this.canvas.connect(this.from, this.to, this.style);
    }
}