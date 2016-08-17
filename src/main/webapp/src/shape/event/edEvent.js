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

                            let createdShape = null;
                            if(shape.shape instanceof FolderShape) {
                                createdShape = editorLayout.renderFolderShape(shape.shape, beforeShape);

                            } else if(shape.shape instanceof EDShape) {
                                createdShape = editorLayout.renderEDShape(shape.shape, beforeShape);

                            } else {
                                ;
                            }
                            editorLayout.renderEdgeShape(beforeShape, createdShape);

                            if(j != sourceShapeAllParent.length - 1) {
                                let createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdShape, 'left');
                                editorLayout.renderEdgeShape(createdShape, createdFolderManagerShape);

                                beforeShape = createdFolderManagerShape;
                                parentShape = createdShape;
                            }
                        }
                    }
                }
            }
        }
        //if(sourceShapeAllParent.length > 0) {
        //    for(let i in targetRightAllParent) {
        //        let parentShape = targetRightAllParent[i];
        //        parentShape.shape.direction = 'left';
        //
        //        for(let j in sourceShapeAllParent) {
        //            let shape = sourceShapeAllParent[j];
        //
        //            if (parentShape.shape.id == shape.shape.parentId) {
        //                shape.shape.direction = 'left';
        //                let parentFolderManager = editorLayout.getLeftFolderManager(parentShape);
        //                beforeShape = parentFolderManager;
        //
        //                let createdShape = null;
        //                if(shape.shape instanceof FolderShape) {
        //                    createdShape = editorLayout.renderFolderShape(shape.shape, beforeShape);
        //
        //                } else if(shape.shape instanceof EDShape) {
        //                    createdShape = editorLayout.renderEDShape(shape.shape, beforeShape);
        //                }
        //                editorLayout.renderEdgeShape(beforeShape, createdShape);
        //
        //                let createdFolderManagerShape = editorLayout.renderFolderManagerShape(createdShape, 'left');
        //                editorLayout.renderEdgeShape(createdShape, createdFolderManagerShape);
        //
        //                beforeShape = createdFolderManagerShape;
        //                parentShape = createdShape;
        //            }
        //        }
        //    }
        //}
    }
}