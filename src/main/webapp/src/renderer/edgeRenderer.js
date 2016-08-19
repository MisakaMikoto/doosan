/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class EdgeRenderer extends Renderer {
    constructor() {
        super();

        this._from = '';
        this._to = '';
        this._edge = '';
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

    set edge(edge) {
        this._edge = edge;
    }

    get edge() {
        return this._edge;
    }

    set style(style) {
        this._style = new OG.geometry.Style(style);
    }

    get style() {
        return this._style;
    }

    render() {
        let fromTerminal = this.canvas._RENDERER.createDefaultTerminalString(this.from);
        let toTerminal = this.canvas._RENDERER.createDefaultTerminalString(this.to);

        return this.canvas._RENDERER.connect(fromTerminal, toTerminal, this.edge, this.style);
    }
}