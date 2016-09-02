'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
var Renderer = function () {
    function Renderer() {
        _classCallCheck(this, Renderer);

        this._canvas = '';
    }

    _createClass(Renderer, [{
        key: 'autoIncreaseLaneSize',
        value: function autoIncreaseLaneSize(shape) {
            var _this = this;

            var distance = 0;
            var nearLane = null;

            // full load?
            if ($('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').length == 2 && $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').length == 3) {
                // only myWorkFlow increase
                if ($('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').length > 0) {
                    (function () {
                        $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function (index) {
                            if (index == 0) {
                                distance = shape.x - this.shape.x;
                                nearLane = this;
                            } else {
                                if (distance > shape.x - this.shape.x) {
                                    distance = shape.x - this.shape.x;
                                    nearLane = this;
                                }
                            }
                        });

                        var shapeRight = shape.x + shape.width / 2;
                        var shapeBottom = shape.y + shape.width / 2;

                        var nearLaneRight = nearLane.shape.x + nearLane.shape.width / 2;
                        var nearLaneBottom = nearLane.shape.y + nearLane.shape.height / 2;

                        if (shapeRight > nearLaneRight) {
                            _this.canvas._RENDERER.resize(nearLane, [0, 0, 0, (shapeRight - nearLaneRight) / 2]);
                        }

                        if (shapeBottom > nearLaneBottom) {
                            $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function () {
                                _this.canvas._RENDERER.resize(_this, [0, (shapeBottom - nearLaneBottom) / 2, 0, 0]);
                            });

                            $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function () {
                                _this.canvas._RENDERER.resize(_this, [0, (shapeBottom - nearLaneBottom) / 2, 0, 0]);
                            });
                        }
                    })();
                }
            }
        }
    }, {
        key: 'autoIncreaseCanvasSize',
        value: function autoIncreaseCanvasSize(shape) {
            var svgWidth = $('svg').width();
            var svgHeight = $('svg').height();

            if (svgWidth < shape.x + shape.width / 2) {
                this.canvas._RENDERER.setCanvasSize([shape.x + shape.width / 2 + 75, svgHeight]);
            }

            if (svgHeight < shape.y + shape.height / 2) {
                this.canvas._RENDERER.setCanvasSize([svgWidth, shape.y + shape.height / 2 + 75]);
            }
        }
    }, {
        key: 'canvas',
        set: function set(canvas) {
            this._canvas = canvas;
        },
        get: function get() {
            return this._canvas;
        }
    }]);

    return Renderer;
}();