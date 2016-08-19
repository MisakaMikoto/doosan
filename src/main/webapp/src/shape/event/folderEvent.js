/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
class FolderEvent extends ShapeEvent {
    constructor(){
        super();
    }

    // TODO : editorLayout refactoring
    add(selectedFolderShape, canvas) {
        if(this.validateLevel(selectedFolderShape)) {
            alert('Folder Maximum Level is 6. Failed Create Folder !!');

        } else {
            let editorLayout = new EditorLayout();
            editorLayout.canvas = canvas;

            let children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
            let folderManager = editorLayout.getRightFolderManager(selectedFolderShape);

            if(typeof selectedFolderShape.shape == 'undefined' && selectedFolderShape.shape.edShapes.length == 0 && selectedFolderShape.shape.folderShapes.length > 0) {
                this.insert(editorLayout, folderManager, selectedFolderShape);

            } else {
                let folderShape = new FolderShape();
                folderShape.parentId = selectedFolderShape.shape.id;
                folderShape.index = (children.length == 0) ? selectedFolderShape.shape.index : children.pop().shape.index + 1;
                folderShape.level = folderManager.shape.level + 1;
                folderShape.direction = 'right';
                folderShape.workFlowType = selectedFolderShape.shape.workFlowType;

                let createdFolderShape = editorLayout.renderFolderShape(folderShape, folderManager);
                editorLayout.renderEdgeShape(folderManager, createdFolderShape);

                let createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdFolderShape, 'right');
                editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);
            }
        }
    }

    // TODO : editorLayout refactoring
    insert(editorLayout, folderManager, selectedFolderShape) {
        let folderManagerNextShape = editorLayout.canvas._RENDERER.getNextShapes(folderManager);

        let folderShape = new FolderShape();
        folderShape.parentId = selectedFolderShape.shape.id;
        folderShape.index = folderManager.shape.index;
        folderShape.level = folderManager.shape.level + 1;
        folderShape.direction = 'right';
        folderShape.workFlowType = selectedFolderShape.shape.workFlowType;

        let createdFolderShape = editorLayout.renderFolderShape(folderShape, folderManager);
        editorLayout.renderEdgeShape(folderManager, createdFolderShape);

        let createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdFolderShape, 'right');
        editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);

        for(let i in folderManagerNextShape) {
            let edShape = folderManagerNextShape[i];
            let prevEdges = editorLayout.canvas._RENDERER.getPrevEdges(edShape);

            for(let i in prevEdges) {
                editorLayout.canvas._RENDERER.remove(prevEdges[i]);
            }
            editorLayout.renderEdgeShape(createdFolderManagerShape, edShape);

            edShape.shape.parentId = createdFolderShape.shape.id;
            edShape.shape.index = createdFolderManagerShape.shape.index;
            edShape.shape.level = createdFolderManagerShape.shape.level + Number(i);
            // margin 75 twice and manager width
            edShape.shape.x = edShape.shape.x + (75 * 2) + 20;
            edShape.shape.y = createdFolderManagerShape.shape.y;

            editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);

            let renderer = new Renderer();
            renderer.canvas = editorLayout.canvas;
            renderer.replaceShape(edShape, 'right', 2);
        }
    }

    share(sourceShape, targetShape, canvas) {
        let editorLayout = new EditorLayout();
        editorLayout.canvas = canvas;
        editorLayout.renderShare(sourceShape, targetShape);
    }

    remove() {

    }

    validateLevel(selectedFolderShape) {
        if(selectedFolderShape.shape.level > 5) {
            return true;

        } else {
            return false;
        }
    }
}