/**
 * Created by MisakaMikoto on 2016. 7. 29..
 */
class Renderer {
    constructor() {
        this._canvas = '';
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    get canvas() {
        return this._canvas;
    }

    autoIncreaseLaneSize(shape) {
        let distance = 0;
        let nearLane = null;

        // full load?
        if($('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').length == 2 && $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').length == 3 ) {
            // only myWorkFlow increase
            if($('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').length > 0) {
                $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function(index) {
                    if(index == 0) {
                        distance = shape.x - this.shape.x;
                        nearLane = this;

                    } else {
                        if(distance > shape.x - this.shape.x) {
                            distance = shape.x - this.shape.x;
                            nearLane = this;
                        }
                    }
                });

                let shapeRight = shape.x + (shape.width / 2);
                let shapeBottom = shape.y + (shape.width / 2);

                let nearLaneRight = nearLane.shape.x + (nearLane.shape.width / 2);
                let nearLaneBottom = nearLane.shape.y + (nearLane.shape.height / 2);

                if(shapeRight > nearLaneRight) {
                    this.canvas._RENDERER.resize(nearLane, [0, 0, 0, (shapeRight - nearLaneRight) / 2]);
                }

                if(shapeBottom > nearLaneBottom) {
                    let self = this;

                    $('[_shape_id="OG.shape.doosan.otherWorkFlowLane"]').each(function() {
                        self.canvas._RENDERER.resize(this, [0, (shapeBottom - nearLaneBottom) / 2, 0, 0]);
                    });

                    $('[_shape_id="OG.shape.doosan.myWorkFlowLane"]').each(function() {
                        self.canvas._RENDERER.resize(this, [0, (shapeBottom - nearLaneBottom) / 2, 0, 0]);
                    });
                }
            }
        }
    }

    autoIncreaseCanvasSize(shape) {
        let svgWidth = $('svg').width();
        let svgHeight = $('svg').height();

        if(svgWidth < (shape.x + (shape.width / 2))) {
            this.canvas._RENDERER.setCanvasSize([(shape.x + (shape.width / 2) + 75), svgHeight]);
        }

        if(svgHeight < (shape.y + (shape.height / 2))) {
            this.canvas._RENDERER.setCanvasSize([svgWidth, (shape.y + (shape.height / 2) + 75)]);
        }
    }
}
