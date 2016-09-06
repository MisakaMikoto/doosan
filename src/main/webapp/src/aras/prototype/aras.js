class Aras {
	constructor() {
		 this._arasObject = (window.opener != null) ? window.opener.aras : '';
		 this._body = '';
	}
	set arasObject(arasObject) {
		this._arasObject = arasObject;
	}
	get arasObject() {
		return this._arasObject;
	}
	
	set body(body) {
		this._body = body;
	}
	
	get body() {
		return this._body;
	}
	
	applyMethod(methodName) {
		let inn = this.arasObject.newIOMInnovator();
        return inn.applyMethod(methodName, this.body);
	}
}