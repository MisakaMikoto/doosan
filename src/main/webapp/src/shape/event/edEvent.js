/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
class EDEvent extends ShapeEvent{
    constructor(){
        super();
    }

    add(selectedFolderShape, canvas) {
        let editorLayout = new EditorLayout();
        editorLayout.canvas = canvas;

        let children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
        let folderManager = editorLayout.getRightFolderManager(selectedFolderShape);
        let folderManagerNextShape = canvas._RENDERER.getNextShapes(folderManager);

        let edShape = new EDShape();
        edShape.parent = selectedFolderShape.shape.id;
        edShape.index = (children.length == 0) ? selectedFolderShape.shape.index : children[children.length - 1].shape.index + 1;
        edShape.level = (children.length == 0) ? folderManager.shape.level + 1 : children[children.length - 1].shape.level;
        edShape.direction = 'right';
        edShape.workFlowType = selectedFolderShape.shape.workFlowType;

        let createdEDShape = editorLayout.renderEDShape(edShape, folderManager);
        editorLayout.renderEdgeShape(folderManager, createdEDShape);
    }

    share(sourceShape, targetShape, canvas) {
        let editorLayout = new EditorLayout();
        editorLayout.canvas = canvas;
        editorLayout.renderShare(sourceShape, targetShape);
    }
}