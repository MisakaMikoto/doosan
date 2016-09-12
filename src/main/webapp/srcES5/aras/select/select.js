'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by MisakaMikoto on 2016. 9. 6..
 */
var Select = function (_Aras) {
	_inherits(Select, _Aras);

	function Select() {
		_classCallCheck(this, Select);

		var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this));

		_this._selectMethodName = '';
		return _this;
	}

	_createClass(Select, [{
		key: 'load',
		value: function load(selectMethodName, inout) {
			this.selectMethodName = selectMethodName;

			var wfId = parent.top.aras != null && typeof parent.top.aras != 'undefined' ? parent.top.thisItem.getID() : '';
			var stdYN = parent.top.aras != null && typeof parent.top.aras != 'undefined' ? parent.top.thisItem.getType() == 'DHI_WF_WFT' ? 'Y' : 'N' : '';

			var body = '<wf_id>' + wfId + '</wf_id>';
			body += '<std_yn>' + stdYN + '</std_yn>';
			body += '<inout>' + inout + '</inout>';

			this.body = body;

			if (typeof this.arasObject != 'undefined' || this.arasObject != null) {
				return this.applyMethod(this.selectMethodName);
			}
		}
	}, {
		key: 'reload',
		value: function reload(selectMethodName, wfId, stdYN) {
			this.selectMethodName = selectMethodName;

			var body = '<wf_id>' + wfId + '</wf_id>';
			body += '<std_yn>' + stdYN + '</std_yn>';
			body += '<inout>OUT</inout>';

			this.body = body;

			if (typeof this.arasObject != 'undefined' || this.arasObject != null) {
				return this.applyMethod(this.selectMethodName);
			}
		}
	}, {
		key: 'selectMethodName',
		set: function set(selectMethodName) {
			this._selectMethodName = selectMethodName;
		},
		get: function get() {
			return this._selectMethodName;
		}
	}]);

	return Select;
}(Aras);