/**
 * Created by MisakaMikoto on 2016. 8. 3..
 */
class FolderManagerEvent extends ShapeEvent {
    constructor() {
        super();
    }

    bindClick(shape) {
        let layout = new Layout();
        layout.canvas = this.canvas;

        $(shape).bind('click', (event) => {
            let targetShape = event.currentTarget;

            let sharedFolderManager = this.getSharedFolderManager(targetShape);
            let sharedNextShapes = this.canvas._RENDERER.getNextShapes(sharedFolderManager);
            let sharedAllFolderManager = sharedFolderManager.concat(targetShape);

            let nextShapes = this.canvas._RENDERER.getNextShapes(targetShape);
            let sharedAllNextShapes = nextShapes.concat(sharedNextShapes);

            if(targetShape.shape.type == 'close') {
                this.close(sharedAllNextShapes);

            } else if(targetShape.shape.type == 'open') {
                this.open(sharedAllNextShapes);

            } else {
                ;
            }
            let targetLane = this.isInLane(targetShape);
            //layout.replace(targetShape, targetLane);
            this.changeMode(sharedAllFolderManager, event.currentTarget.shape.type);

        });
    }

    close(sharedAllNextShapes) {
        let nextShapeChildShapes = [];
        for(let i in sharedAllNextShapes) {
            let nextShape = sharedAllNextShapes[i];
            $(nextShape).css('display', 'none');

            nextShapeChildShapes = nextShapeChildShapes.concat(this.canvas._RENDERER.getNextShapes(nextShape));

            let prevEdges = this.canvas._RENDERER.getPrevEdges(nextShape);
            for(let i in prevEdges) {
                let prevEdge = prevEdges[i];
                $(prevEdge).css('display', 'none');
            }
        }

        if(nextShapeChildShapes.length > 0) {
            this.close(nextShapeChildShapes);
        }
    }

    open(sharedAllNextShapes) {
        let nextShapeChildShapes = [];
        for(let i in sharedAllNextShapes) {
            let nextShape = sharedAllNextShapes[i];
            $(nextShape).css('display', '');

            nextShapeChildShapes = nextShapeChildShapes.concat(this.canvas._RENDERER.getNextShapes(nextShape));

            let prevEdges = this.canvas._RENDERER.getPrevEdges(nextShape);
            for(let i in prevEdges) {
                let prevEdge = prevEdges[i];
                $(prevEdge).css('display', '');
            }
        }

        if(nextShapeChildShapes.length > 0) {
            this.open(nextShapeChildShapes);
        }
    }

    changeMode(sharedAllFolderManager, type) {
        if(type == 'close') {
            for(let i in sharedAllFolderManager) {
                let folderManager = sharedAllFolderManager[i];

                $(folderManager)[0].shape.type = 'open';
                $(folderManager).find('image').attr('href', 'resources/expand.svg');
            }

        } else {
            for(let i in sharedAllFolderManager) {
                let folderManager = sharedAllFolderManager[i];

                $(folderManager)[0].shape.type = 'close';
                $(folderManager).find('image').attr('href', 'resources/collapse.svg');
            }
        }
    }

    getSharedFolderManager(selectedFolderManager) {
        // 여기 부터 작업
        let sharedFolderManager = [];
        $('[_shape_id="OG.shape.doosan.folderManager"]').each((index, element) => {
            if(element.shape.id == selectedFolderManager.shape.id) {
                sharedFolderManager.push(element);
                return false;
            }
        });
        return sharedFolderManager;
    }

    isInLane(targetShape) {
        let targetLane = null;
        $('[_shape="GROUP"]').each((index, element) => {
            let laneOffset = $(element).offset();
            let laneTop = laneOffset.top;
            let laneBottom = laneOffset.top + element.shape.height;
            let laneLeft = laneOffset.left;
            let laneRight = laneOffset.left + element.shape.width;

            let shapeOffset = $(targetShape).offset();
            let shapeTop = shapeOffset.top;
            let shapeBottom = shapeOffset.top + targetShape.shape.height;
            let shapeLeft = shapeOffset.left;
            let shapeRight = shapeOffset.left + targetShape.shape.width;

            if( ((laneBottom >= shapeBottom) && (shapeBottom >= laneTop))
                && ((laneBottom >= shapeTop) && (shapeTop >= laneTop))
                && ((laneLeft <= shapeLeft) && (shapeLeft <= laneRight))
                && ((laneLeft <= shapeRight) && (shapeRight <= laneRight)) ) {

                targetLane = element;
                return false;
            }
        });
        return targetLane;
    }
}
