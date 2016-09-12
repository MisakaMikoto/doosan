'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Aras = function () {
	function Aras() {
		_classCallCheck(this, Aras);

		this._arasObject = parent.top.aras != null && typeof parent.top.aras != 'undefined' ? parent.top.aras : '';
		this._body = '';
	}

	_createClass(Aras, [{
		key: 'applyMethod',
		value: function applyMethod(methodName) {
			var inn = this.arasObject.newIOMInnovator();
			return inn.applyMethod(methodName, this.body);
		}
	}, {
		key: 'arasObject',
		set: function set(arasObject) {
			this._arasObject = arasObject;
		},
		get: function get() {
			return this._arasObject;
		}
	}, {
		key: 'body',
		set: function set(body) {
			this._body = body;
		},
		get: function get() {
			return this._body;
		}
	}]);

	return Aras;
}();