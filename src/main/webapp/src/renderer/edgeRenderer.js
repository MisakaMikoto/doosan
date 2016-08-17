/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class EdgeRenderer extends Renderer {
    constructor() {
        super();

        this._from = '';
        this._to = '';
        this._style = '';
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

    set style(style) {
        this._style = new OG.geometry.Style(style);
    }

    get style() {
        return this._style;
    }

    render() {
        return this.canvas.connect(this.from, this.to, this.style);
    }
}