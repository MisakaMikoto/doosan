class Popup extends Aras {
	constructor() {
		super();
		
		this._targetObject = '';
		this._targetMethod = '';
		this._params = [];
	}
	
	set targetObject(targetObject) {
		this._targetObject = targetObject;
	}
	
	get targetObject() {
		return this._targetObject;
	}
	
	set targetMethod(targetMethod) {
		this._targetMethod = targetMethod;
	}
	
	get targetMethod() {
		return this._targetMethod;
	}
	
	set params(params) {
		this._params = params;
	}
	
	get params() {
		return this._params;
	}
	
	create(targetObject, targetMethod, params) {
		this.targetObject = targetObject;
		this.targetMethod = targetMethod;
		this.params = params;
		
		let inn = this.arasObject.newIOMInnovator();
		let newObject = inn.newItem('DHI_WF_FOLDER', 'add');
		
		// aras callback
		let asyncResult = this.arasObject.uiShowItemEx(newObject.node, undefined, true);
	        asyncResult.then((arasWindow) => {
	        	let callback = $.proxy(this.reflect, this);
	        	
	            let EventBottomSave = {};
	            EventBottomSave.window = window;
	            EventBottomSave.handler = callback;
	            arasWindow.top.commandEventHandlers["aftersave"] = [];
	            arasWindow.top.commandEventHandlers["aftersave"].push(EventBottomSave);
	
	            arasWindow.top.commandEventHandlers["afterunlock"] = [];
	            arasWindow.top.commandEventHandlers["afterunlock"].push(EventBottomSave);
	        });
	}
	
	reflect() {
		if(Reflect.has(this.targetObject, this.targetMethod)) {
            Reflect.apply(this.targetObject[this.targetMethod], this.targetObject, this.params);

        } else {
            console.log('reflect fail!!');
        }
	}
}