/**
 * Created by MisakaMikoto on 2016. 8. 3..
 */
class FolderManagerEvent {
    constructor(canvas) {
        this._canvas = canvas;
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    get canvas() {
        return this._canvas;
    }

    unbind() {
        $('#canvas').find('svg').find('g').find('[_shape_id="OG.shape.doosan.folderManager"]').each(function() {
            $(this).unbind('click');
        });
    }

    bind() {
        var self = this;

        $('#canvas').find('svg').find('g').find('[_shape_id="OG.shape.doosan.folderManager"]').bind('click', function() {
            if($(this).css('display') != 'none') {
                let toEdges = $(this).attr('_toedge').split(',');

                if(this.shape.type == 'close') {
                    self.close(toEdges);

                } else {
                    self.open(toEdges);
                }
                self.replace(this, toEdges, this.shape.direction, this.shape.type);
                self.changeMode(this, this.shape.type);
            }
        });
    }

    close(toEdges) {
        for(let i in toEdges) {
            let to = $('#' + toEdges[i]).attr('_to').split('_TERMINAL')[0];
            $('#' + to).css('display', 'none');
            $('#' + toEdges[i]).css('display', 'none');

            if(typeof $('#' + to).attr('_toedge') != 'undefined') {
                let childToEdges = $('#' + to).attr('_toedge').split(',');
                this.close(childToEdges);
            }
        }
    }

    open(toEdges) {
        for(let i in toEdges) {
            let to = $('#' + toEdges[i]).attr('_to').split('_TERMINAL')[0];
            $('#' + to).css('display', '');
            $('#' + toEdges[i]).css('display', '');

            if(typeof $('#' + to).attr('_toedge') != 'undefined') {
                let childToEdges = $('#' + to).attr('_toedge').split(',');
                this.open(childToEdges);
            }
        }
    }

    replace(folderManager, toEdges, direction, type) {
        this.replaceShape(folderManager, toEdges[toEdges.length - 1], direction, type);
        this.replaceEdge();
    }

    replaceShape(folderManager, lastToEdge, direction, type) {
        var self = this;

        let to = $('#' + lastToEdge).attr('_to').split('_TERMINAL')[0];
        let lastShapeIndex = $('#' + to)[0].shape.index;

        $('#canvas').find('svg').find('g').each(function() {
            if($(this).attr('_type') == 'SHAPE' && this.shape.index > lastShapeIndex && this.shape.direction == direction) {
                let offset = [];
                offset.push(0);

                if(type == 'close' && lastShapeIndex > folderManager.shape.index) {
                    offset.push(0 - (90 * (lastShapeIndex - folderManager.shape.index)));

                } else if(type == 'open' && lastShapeIndex > folderManager.shape.index){
                    offset.push(0 + (90 * (lastShapeIndex + folderManager.shape.index)));

                } else {
                    offset.push(0);
                }
                self.canvas._RENDERER.move(this, offset);
            }
        });
    }

    replaceEdge() {
        let allEdges = this.canvas._RENDERER.getAllEdges();
        for(let i in allEdges) {
            this.canvas._RENDERER.reconnect(allEdges[i]);
        }
    }

    changeMode(collapse, type) {
        if(type == 'close') {
            $('#' + collapse.id)[0].shape.type = 'open';
            $('#' + collapse.id).find('image').attr('href', 'resources/expand.svg');

        } else {
            $('#' + collapse.id)[0].shape.type = 'close';
            $('#' + collapse.id).find('image').attr('href', 'resources/collapse.svg');

        }
    }
}
