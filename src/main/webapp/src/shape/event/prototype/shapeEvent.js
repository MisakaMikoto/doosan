/**
 * Created by MisakaMikoto on 2016. 8. 8..
 */
class ShapeEvent {
    constructor() {
        this._canvas = canvas;
    }

    set canvas(canvas) {
        this._canvas = canvas;
    }

    get canvas() {
        return this._canvas;
    }
    
    // child override this method
    // if reflect event object, this method confirmed 
    add() {
    }

    bindDraggable(shape) {
        let self = this;
        let standardSpanOffset = $('#draggable').offset();

        $(shape).draggable({
            drag: function (event, ui) {
                let editorLayout = new EditorLayout();
                editorLayout.createShapeSpan(ui, shape.shape.src);
            },

            stop: function (event, ui) {
                let editorLayout = new EditorLayout();
                editorLayout.canvas = self.canvas;

                // span hide
                $('#draggable').css('display', '');
                $('#draggable').css('background-image', '');
                $('#draggable').offset({top: standardSpanOffset.top, left: standardSpanOffset.left});

                let target = editorLayout.isInTarget(ui);
                if ( (typeof target != 'undefined' && target != null)
                    && (target.shape instanceof FolderShape || target.shape instanceof ActivityShape) ) {

                    if (shape.shape instanceof FolderShape) {
                        let folderEvent = new FolderEvent();
                        folderEvent.share(this, target, self.canvas);

                    } else if (shape.shape instanceof EDShape) {
                        let edEvent = new EDEvent();
                        edEvent.share(this, target, self.canvas);

                    } else {
                        ;
                    }
                }
            }
        });
    }

    bindContextMenu(shape, workFlowType, layoutType) {
        let items = null;

        if(layoutType == 'editorLayout') {
            if (shape.shape instanceof ActivityShape || shape.shape instanceof FolderShape){
                if(typeof shape.shape.edShapes != 'undefined' && shape.shape.edShapes.length > 0) {
                    items = {
                        'addED': {name: 'Add ED', icon: 'edit'},
                        'remove': {name: 'Remove', icon: 'delete'},
                        'properties': {name: 'Properties', icon: 'edit'},
                        'listProperties': {name: 'List Properties', icon: 'edit'}
                    }
                } else {
                    items = {
                        'addFolder': {name: 'Add Folder', icon: 'edit'},
                        'addED': {name: 'Add ED', icon: 'edit'},
                        'remove': {name: 'Remove', icon: 'delete'},
                        'properties': {name: 'Properties', icon: 'edit'},
                        'listProperties': {name: 'List Properties', icon: 'edit'}
                    }
                }

            } else if (shape.shape instanceof EDShape) {
                if (workFlowType == 'otherWorkFlow') {
                    items = {
                        'properties': {name: 'Properties', icon: 'edit'},
                        'listProperties': {name: 'List Properties', icon: 'edit'}
                    }

                } else {
                    items = {
                        'remove': {name: 'Remove', icon: 'delete'},
                        'properties': {name: 'Properties', icon: 'edit'},
                        'listProperties': {name: 'List Properties', icon: 'edit'}
                    }
                }

            } else if (shape.shape instanceof EdgeShape) {
                items = {
                    'remove': {name: 'Remove', icon: 'delete'}
                }

            } else {
                ;
            }

        } else if(layoutType == 'monitoringLayout'){
            items = {
                'properties': {name: 'Properties', icon: 'edit'},
                'listProperties': {name: 'List Properties', icon: 'edit'}
            }
        } else {
            ;
        }
        this.createContextMenu(shape.id, items);
    }

    createContextMenu(id, items) {
        let self = this;
        $.contextMenu({
            selector: '#' + id,
            callback: function (key) {
                if (key == 'addFolder') {
                    let popup = new Popup();
                	popup.create(new FolderEvent(), 'add', [this[0], self.canvas]);

                } else if (key == 'addED') {
                	let popup = new Popup();
                	popup.create(new EDEvent(), 'add', [this[0], self.canvas]);

                } else if (key == 'remove') {
                    if (this[0].shape instanceof FolderShape) {

                    } else if (this[0].shape instanceof EDShape) {
                    }

                } else {
                    var popUrl = '/page/' + key + '.jsp';	//팝업창에 출력될 페이지 URL
                    var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
                    window.open(popUrl, key, popOption);
                }
            },
            items: items
        });
    }
}

