"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// keyCode constants
var BACKSPACE = 8;
var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var DELETE = 46;
var SPACEBAR = 32;

// Doesn't really check if it's a style Object
// Basic implementation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
var isStyleObject = function isStyleObject(obj) {
  return _typeof(obj) === 'object';
};

var SingleOtpInput = /*#__PURE__*/function (_PureComponent) {
  _inherits(SingleOtpInput, _PureComponent);

  var _super = _createSuper(SingleOtpInput);

  function SingleOtpInput() {
    var _temp, _this;

    _classCallCheck(this, SingleOtpInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _super.call.apply(_super, [this].concat(args)), _this.getClasses = function () {
      for (var _len2 = arguments.length, classes = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        classes[_key2] = arguments[_key2];
      }

      return classes.filter(function (c) {
        return !isStyleObject(c) && c !== false;
      }).join(' ');
    }, _temp));
  }

  _createClass(SingleOtpInput, [{
    key: "componentDidMount",
    // Focus on first render
    // Only when shouldAutoFocus is true
    value: function componentDidMount() {
      var input = this.input,
          _this$props = this.props,
          focus = _this$props.focus,
          shouldAutoFocus = _this$props.shouldAutoFocus;

      if (input && focus && shouldAutoFocus) {
        input.focus();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var input = this.input,
          focus = this.props.focus; // Check if focusedInput changed
      // Prevent calling function if input already in focus

      if (prevProps.focus !== focus && input && focus) {
        input.focus();
        input.select();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          separator = _this$props2.separator,
          isLastChild = _this$props2.isLastChild,
          inputStyle = _this$props2.inputStyle,
          focus = _this$props2.focus,
          isDisabled = _this$props2.isDisabled,
          hasErrored = _this$props2.hasErrored,
          errorStyle = _this$props2.errorStyle,
          focusStyle = _this$props2.focusStyle,
          disabledStyle = _this$props2.disabledStyle,
          shouldAutoFocus = _this$props2.shouldAutoFocus,
          isInputNum = _this$props2.isInputNum,
          value = _this$props2.value,
          rest = _objectWithoutProperties(_this$props2, ["separator", "isLastChild", "inputStyle", "focus", "isDisabled", "hasErrored", "errorStyle", "focusStyle", "disabledStyle", "shouldAutoFocus", "isInputNum", "value"]);

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement("input", _extends({
        autoComplete: "off",
        style: Object.assign({
          width: '1em',
          textAlign: 'center'
        }, isStyleObject(inputStyle) && inputStyle, focus && isStyleObject(focusStyle) && focusStyle, isDisabled && isStyleObject(disabledStyle) && disabledStyle, hasErrored && isStyleObject(errorStyle) && errorStyle),
        className: this.getClasses(inputStyle, focus && focusStyle, isDisabled && disabledStyle, hasErrored && errorStyle),
        type: isInputNum ? 'tel' : 'text',
        maxLength: "1",
        ref: function ref(input) {
          _this2.input = input;
        },
        disabled: isDisabled,
        value: value ? value : ''
      }, rest)), !isLastChild && separator);
    }
  }]);

  return SingleOtpInput;
}(_react.PureComponent);

var OtpInput = /*#__PURE__*/function (_Component) {
  _inherits(OtpInput, _Component);

  var _super2 = _createSuper(OtpInput);

  function OtpInput() {
    var _temp2, _this3;

    _classCallCheck(this, OtpInput);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _possibleConstructorReturn(_this3, (_temp2 = _this3 = _super2.call.apply(_super2, [this].concat(args)), _this3.state = {
      activeInput: 0
    }, _this3.getOtpValue = function () {
      return _this3.props.value ? _this3.props.value.toString().split('') : [];
    }, _this3.handleOtpChange = function (otp) {
      var onChange = _this3.props.onChange;
      var otpValue = otp.join('');
      onChange(otpValue);
    }, _this3.isInputValueValid = function (value) {
      var isTypeValid = _this3.props.isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string';
      return isTypeValid && value.trim().length === 1;
    }, _this3.focusInput = function (input) {
      var numInputs = _this3.props.numInputs;
      var activeInput = Math.max(Math.min(numInputs - 1, input), 0);

      _this3.setState({
        activeInput: activeInput
      });
    }, _this3.focusNextInput = function () {
      var activeInput = _this3.state.activeInput;

      _this3.focusInput(activeInput + 1);
    }, _this3.focusPrevInput = function () {
      var activeInput = _this3.state.activeInput;

      _this3.focusInput(activeInput - 1);
    }, _this3.changeCodeAtFocus = function (value) {
      var activeInput = _this3.state.activeInput;

      var otp = _this3.getOtpValue();

      otp[activeInput] = value[0];

      _this3.handleOtpChange(otp);
    }, _this3.handleOnPaste = function (e) {
      e.preventDefault();
      var numInputs = _this3.props.numInputs;
      var activeInput = _this3.state.activeInput;

      var otp = _this3.getOtpValue(); // Get pastedData in an array of max size (num of inputs - current position)


      var pastedData = e.clipboardData.getData('text/plain').slice(0, numInputs - activeInput).split(''); // Paste data from focused input onwards

      for (var pos = 0; pos < numInputs; ++pos) {
        if (pos >= activeInput && pastedData.length > 0) {
          otp[pos] = pastedData.shift();
        }
      }

      _this3.handleOtpChange(otp);
    }, _this3.handleOnChange = function (e) {
      var value = e.target.value;

      if (_this3.isInputValueValid(value)) {
        _this3.changeCodeAtFocus(value);
      }
    }, _this3.handleOnKeyDown = function (e) {
      if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
        e.preventDefault();

        _this3.changeCodeAtFocus('');

        _this3.focusPrevInput();
      } else if (e.keyCode === DELETE || e.key === 'Delete') {
        e.preventDefault();

        _this3.changeCodeAtFocus('');
      } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
        e.preventDefault();

        _this3.focusPrevInput();
      } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
        e.preventDefault();

        _this3.focusNextInput();
      } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar' || e.key === 'Space') {
        e.preventDefault();
      }
    }, _this3.handleOnInput = function (e) {
      if (_this3.isInputValueValid(e.target.value)) {
        _this3.focusNextInput();
      } else {
        // This is a workaround for dealing with keyCode "229 Unidentified" on Android.
        if (!_this3.props.isInputNum) {
          var nativeEvent = e.nativeEvent;

          if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
            e.preventDefault();

            _this3.changeCodeAtFocus('');

            _this3.focusPrevInput();
          }
        }
      }
    }, _this3.renderInputs = function () {
      var activeInput = _this3.state.activeInput;
      var _this3$props = _this3.props,
          numInputs = _this3$props.numInputs,
          inputStyle = _this3$props.inputStyle,
          focusStyle = _this3$props.focusStyle,
          separator = _this3$props.separator,
          isDisabled = _this3$props.isDisabled,
          disabledStyle = _this3$props.disabledStyle,
          hasErrored = _this3$props.hasErrored,
          errorStyle = _this3$props.errorStyle,
          shouldAutoFocus = _this3$props.shouldAutoFocus,
          isInputNum = _this3$props.isInputNum;

      var otp = _this3.getOtpValue();

      var inputs = [];

      var _loop = function _loop(i) {
        inputs.push( /*#__PURE__*/_react["default"].createElement(SingleOtpInput, {
          key: i,
          focus: activeInput === i,
          value: otp && otp[i],
          onChange: _this3.handleOnChange,
          onKeyDown: _this3.handleOnKeyDown,
          onInput: _this3.handleOnInput,
          onPaste: _this3.handleOnPaste,
          onFocus: function onFocus(e) {
            _this3.setState({
              activeInput: i
            });

            e.target.select();
          },
          onBlur: function onBlur() {
            return _this3.setState({
              activeInput: -1
            });
          },
          separator: separator,
          inputStyle: inputStyle,
          focusStyle: focusStyle,
          isLastChild: i === numInputs - 1,
          isDisabled: isDisabled,
          disabledStyle: disabledStyle,
          hasErrored: hasErrored,
          errorStyle: errorStyle,
          shouldAutoFocus: shouldAutoFocus,
          isInputNum: isInputNum
        }));
      };

      for (var i = 0; i < numInputs; i++) {
        _loop(i);
      }

      return inputs;
    }, _temp2));
  }

  _createClass(OtpInput, [{
    key: "render",
    value: function render() {
      var containerStyle = this.props.containerStyle;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: Object.assign({
          display: 'flex'
        }, isStyleObject(containerStyle) && containerStyle),
        className: !isStyleObject(containerStyle) ? containerStyle : ''
      }, this.renderInputs());
    }
  }]);

  return OtpInput;
}(_react.Component);

OtpInput.defaultProps = {
  numInputs: 4,
  onChange: function onChange(otp) {
    return console.log(otp);
  },
  isDisabled: false,
  shouldAutoFocus: false,
  value: ''
};
var _default = OtpInput;
exports["default"] = _default;
