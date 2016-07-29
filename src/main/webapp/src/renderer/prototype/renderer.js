/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class Renderer {
    constructor() {
        this._x = '';
        this._y = '';

        this._width = '';
        this._height = '';

        this._shape = '';
    }

    set x(x) {
        this._x = x;
    }

    get x() {
        return this._x;
    }

    set y(y) {
        this._y = y;
    }

    get y() {
        return this._y;
    }

    set width(width) {
        this._width = width;
    }

    get width() {
        return this._width;
    }

    set height(height) {
        this._height = height;
    }

    get height() {
        return this._height;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get shape() {
        return this._shape;
    }
}