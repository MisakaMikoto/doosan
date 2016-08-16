/**
 * Created by MisakaMikoto on 2016. 8. 3..
 */
class FolderManagerEvent extends ShapeEvent {
    constructor() {
        super();
    }

    bindClick(shape) {
        let self = this;
        let layout = new Layout();
        layout.canvas = this.canvas;

        $(shape).bind('click', function() {
            if($(this).css('display') != 'none') {
                let toEdges = $(this).attr('_toedge').split(',');

                if(this.shape.type == 'close') {
                    self.close(toEdges);

                } else {
                    self.open(toEdges);
                }
                //layout.replace(this, toEdges, this.shape.direction, this.shape.type);
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
