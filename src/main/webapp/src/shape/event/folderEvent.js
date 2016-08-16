/**
 * Created by MisakaMikoto on 2016. 8. 11..
 */
class FolderEvent extends ShapeEvent {
    constructor(){
        super();
    }

    add(selectedFolderShape, canvas) {
        if(this.validateLevel(selectedFolderShape)) {
            alert('Folder Maximum Level is 6. Failed Create Folder !!');

        } else {
            let editorLayout = new EditorLayout();
            editorLayout.canvas = canvas;

            let children = editorLayout.getShapeRightAllChildren(selectedFolderShape, []);
            let folderManager = editorLayout.getRightFolderManager(selectedFolderShape);
            let folderManagerNextShape = canvas._RENDERER.getNextShapes(folderManager);

            if(typeof folderManagerNextShape != 'undefined' && folderManagerNextShape[0].shape instanceof EDShape) {
                this.insert(editorLayout, folderManager, folderManagerNextShape, selectedFolderShape);

            } else {
                let folderShape = new FolderShape();
                folderShape.parentId = selectedFolderShape.shape.id;
                folderShape.index = (children.length == 0) ? selectedFolderShape.shape.index : children[children.length - 1].shape.index + 1;
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

    insert(editorLayout, folderManager, folderManagerNextShape, selectedFolderShape) {
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

        let folderManager = editorLayout.getLeftFolderManager(targetShape);

        let targetRightAllParent = [];
        targetRightAllParent.push(targetShape);
        targetRightAllParent = editorLayout.getShapeAllParents(targetShape, targetRightAllParent);

        let sourceShapeAllParent = [];
        sourceShapeAllParent.push(sourceShape);
        sourceShapeAllParent = editorLayout.getShapeAllParents(sourceShape, sourceShapeAllParent);
        sourceShapeAllParent = editorLayout.createUniqueArray(sourceShapeAllParent, targetRightAllParent);


        let beforeShape = folderManager;
        if (sourceShapeAllParent.length > 0) {
            if (targetRightAllParent.length > 0) {
                for (let i in targetRightAllParent) {
                    let parentShape = targetRightAllParent[i];
                    parentShape.shape.direction = 'left';

                    for (let j in sourceShapeAllParent) {
                        let shape = sourceShapeAllParent[j];

                        if (parentShape.shape.id == shape.shape.parentId) {
                            shape.shape.direction = 'left';
                            let parentFolderManager = editorLayout.getLeftFolderManager(parentShape);
                            beforeShape = parentFolderManager;

                            let createdFolderShape = editorLayout.renderFolderShape(shape.shape, beforeShape);
                            editorLayout.renderEdgeShape(beforeShape, createdFolderShape);

                            let createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdFolderShape, 'left');
                            editorLayout.renderEdgeShape(createdFolderShape, createdFolderManagerShape);

                            beforeShape = createdFolderManagerShape;
                            parentShape = createdFolderShape;
                        }
                    }
                }
            }
        }
    }

    validateLevel(selectedFolderShape) {
        if(selectedFolderShape.shape.level > 5) {
            return true;

        } else {
            return false;
        }
    }
}