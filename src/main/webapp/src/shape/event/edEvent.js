/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
class EDEvent extends ShapeEvent{
    constructor(){
        super();
    }

    // TODO : editorLayout refactoring
    add(selectedFolderShape, canvas) {
        let editorLayout = new EditorLayout();
        editorLayout.canvas = canvas;

        let children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
        let folderManager = editorLayout.getRightFolderManager(selectedFolderShape);

        let edShape = new EDShape();
        edShape.parent = selectedFolderShape.shape.id;
        edShape.index = (children.length == 0) ? selectedFolderShape.shape.index : children.pop().shape.index + 1;
        edShape.level = (children.length == 0) ? folderManager.shape.level + 1 : children.pop().shape.level;
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

    remove() {

    }
}