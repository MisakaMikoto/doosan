class Select extends Aras {
	constructor() {
		super();
		this._selectMethodName = '';
	}
	
	set selectMethodName(selectMethodName) {
		this._selectMethodName = selectMethodName;
	}
	
	get selectMethodName() {
		return this._selectMethodName;
	}
	
	runApplyMethod() {
		if(this.arasObject.length > 0) {
			return this.applyMethod(this.selectMethodName);
		}
	}
}