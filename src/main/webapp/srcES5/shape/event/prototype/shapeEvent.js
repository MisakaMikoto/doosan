'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by MisakaMikoto on 2016. 8. 8..
 */
var ShapeEvent = function () {
    function ShapeEvent() {
        _classCallCheck(this, ShapeEvent);

        this._canvas = canvas;
    }

    _createClass(ShapeEvent, [{
        key: 'bindDraggable',
        value: function bindDraggable(shape) {
            var self = this;
            var standardSpanOffset = $('#draggable').offset();

            $(shape).draggable({
                drag: function drag(event, ui) {
                    var editorLayout = new EditorLayout();
                    editorLayout.createShapeSpan(ui, shape.shape.src);
                },

                stop: function stop(event, ui) {
                    var editorLayout = new EditorLayout();
                    editorLayout.canvas = self.canvas;

                    // span hide
                    $('#draggable').css('display', '');
                    $('#draggable').css('background-image', '');
                    $('#draggable').offset({ top: standardSpanOffset.top, left: standardSpanOffset.left });

                    var target = editorLayout.isInTarget(ui);
                    if (typeof target != 'undefined' && target != null && (target.shape instanceof FolderShape || target.shape instanceof ActivityShape)) {

                        if (shape.shape instanceof FolderShape) {
                            var folderEvent = new FolderEvent();
                            folderEvent.share(this, target, self.canvas);
                        } else if (shape.shape instanceof EDShape) {
                            var edEvent = new EDEvent();
                            edEvent.share(this, target, self.canvas);
                        } else {
                            ;
                        }
                    }
                }
            });
        }
    }, {
        key: 'bindContextMenu',
        value: function bindContextMenu(shape, workFlowType, layoutType) {
            var items = null;

            if (layoutType == 'editorLayout') {
                if (shape.shape instanceof ActivityShape || shape.shape instanceof FolderShape) {
                    if (typeof shape.shape.edShapes != 'undefined' && shape.shape.edShapes.length > 0) {
                        items = {
                            'addED': { name: 'Add ED', icon: 'edit' },
                            'remove': { name: 'Remove', icon: 'delete' },
                            'properties': { name: 'Properties', icon: 'edit' },
                            'listProperties': { name: 'List Properties', icon: 'edit' }
                        };
                    } else {
                        items = {
                            'addFolder': { name: 'Add Folder', icon: 'edit' },
                            'addED': { name: 'Add ED', icon: 'edit' },
                            'remove': { name: 'Remove', icon: 'delete' },
                            'properties': { name: 'Properties', icon: 'edit' },
                            'listProperties': { name: 'List Properties', icon: 'edit' }
                        };
                    }
                } else if (shape.shape instanceof EDShape) {
                    if (workFlowType == 'otherWorkFlow') {
                        items = {
                            'properties': { name: 'Properties', icon: 'edit' },
                            'listProperties': { name: 'List Properties', icon: 'edit' }
                        };
                    } else {
                        items = {
                            'remove': { name: 'Remove', icon: 'delete' },
                            'properties': { name: 'Properties', icon: 'edit' },
                            'listProperties': { name: 'List Properties', icon: 'edit' }
                        };
                    }
                } else if (shape.shape instanceof EdgeShape) {
                    items = {
                        'remove': { name: 'Remove', icon: 'delete' }
                    };
                } else {
                    ;
                }
            } else if (layoutType == 'monitoringLayout') {
                items = {
                    'properties': { name: 'Properties', icon: 'edit' },
                    'listProperties': { name: 'List Properties', icon: 'edit' }
                };
            } else {
                ;
            }
            this.createContextMenu(shape.id, items);
        }
    }, {
        key: 'createContextMenu',
        value: function createContextMenu(id, items) {
            var self = this;
            $.contextMenu({
                selector: '#' + id,
                callback: function callback(key) {
                    if (key == 'addFolder') {
                        var folderEvent = new FolderEvent();
                        folderEvent.add(this[0], self.canvas);
                    } else if (key == 'addED') {
                        var edEvent = new EDEvent();
                        edEvent.add(this[0], self.canvas);
                    } else if (key == 'remove') {
                        if (this[0].shape instanceof FolderShape) {} else if (this[0].shape instanceof EDShape) {}
                    } else {
                        var popUrl = '/page/' + key + '.jsp'; //팝업창에 출력될 페이지 URL
                        var popOption = "width=370, height=360, resizable=no, scrollbars=no, status=no;"; //팝업창 옵션(optoin)
                        window.open(popUrl, key, popOption);
                    }
                },
                items: items
            });
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

    return ShapeEvent;
}();