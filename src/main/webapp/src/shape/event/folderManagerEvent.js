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
            let sharedFolderManager = self.getSharedFolderManager(this);
            let sharedNextShapes = self.canvas._RENDERER.getNextShapes(sharedFolderManager);
            let sharedAllFolderManager = sharedFolderManager.concat(this);

            let nextShapes = self.canvas._RENDERER.getNextShapes(this);
            let sharedAllNextShapes = nextShapes.concat(sharedNextShapes);

            if(this.shape.type == 'close') {
                self.close(sharedAllNextShapes);

            } else if(this.shape.type == 'open') {
                self.open(sharedAllNextShapes);

            } else {
                ;
            }
            self.changeMode(sharedAllFolderManager, this.shape.type);
            //layout.replace(this, toEdges, this.shape.direction, this.shape.type);
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
        let sharedFolderManager = [];
        $('[_shape_id="OG.shape.doosan.folderManager"]').each(function() {
            if(this.shape.id == selectedFolderManager.shape.id) {
                sharedFolderManager.push(this);
            }
            return false;
        });
        return sharedFolderManager;
    }
}
