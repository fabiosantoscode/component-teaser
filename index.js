'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Teaser = (function (_React$Component) {
  _inherits(Teaser, _React$Component);

  function Teaser() {
    _classCallCheck(this, Teaser);

    _React$Component.apply(this, arguments);
  }

  Teaser.prototype.render = function render() {
    var teaserContent = [];
    var groups = [];
    if (this.props.image) {
      groups.push(_react2['default'].createElement(
        'div',
        { className: 'teaser__group-image' },
        _react2['default'].createElement('img', _extends({}, this.props.image, {
          itemProp: 'image',
          className: 'teaser__img',
          key: 'teaser__img_' + this.props.teaserId
        }))
      ));
    }
    if (this.props.flyTitle) {
      teaserContent.push(_react2['default'].createElement(
        'h2',
        {
          className: 'teaser__flytitle',
          itemProp: 'alternativeHeadline',
          key: 'teaser__flytitle_' + this.props.teaserId
        },
        this.props.flyTitle
      ));
    }
    if (this.props.title) {
      teaserContent.push(_react2['default'].createElement(
        'h1',
        {
          className: 'teaser__title',
          itemProp: 'headline',
          key: 'teaser__title_' + this.props.teaserId
        },
        this.props.title
      ));
    }
    if (this.props.dateTime) {
      teaserContent.push(_react2['default'].createElement(
        'time',
        {
          className: 'teaser__datetime',
          itemProp: 'dateCreated',
          dateTime: this.props.dateTime,
          key: 'teaser__datetime_' + this.props.teaserId
        },
        this.props.dateFormat(this.props.dateTime)
      ));
    }
    if (this.props.text) {
      teaserContent.push(_react2['default'].createElement(
        'div',
        {
          className: 'teaser__text',
          itemProp: 'description',
          key: 'teaser__text_' + this.props.teaserId
        },
        this.props.text
      ));
    }
    groups.push(_react2['default'].createElement(
      'div',
      { className: 'teaser__group-text' },
      teaserContent
    ));

    var content = {};
    if (this.props.link) {
      content = _react2['default'].createElement(
        'a',
        _extends({}, this.props.link, {
          className: 'teaser__link',
          itemProp: 'url'
        }),
        groups
      );
    } else {
      content = groups;
    }
    return _react2['default'].createElement(
      'article',
      {
        className: 'teaser',
        itemScope: true, itemType: this.props.itemType, itemProp: this.props.itemProp,
        role: 'article'
      },
      content
    );
  };

  _createClass(Teaser, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        teaserId: _react2['default'].PropTypes.number.isRequired,
        image: _react2['default'].PropTypes.object,
        flyTitle: _react2['default'].PropTypes.string,
        title: _react2['default'].PropTypes.string.isRequired,
        dateTime: _react2['default'].PropTypes.instanceOf(Date),
        dateFormat: _react2['default'].PropTypes.instanceOf(Function),
        text: _react2['default'].PropTypes.string,
        link: _react2['default'].PropTypes.object,
        itemType: _react2['default'].PropTypes.string,
        itemProp: _react2['default'].PropTypes.string
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        itemType: 'http://schema.org/Article',
        itemProp: 'article',
        dateFormat: function dateFormat(date) {
          // Sep 19th 2015, 9:49
          function addPostFix(day) {
            var daystr = day.toString();
            var lastChar = daystr.charAt(daystr.length - 1);
            var postFix = '';
            switch (lastChar) {
              case '1':
                postFix = 'st';
                break;
              case '2':
                postFix = 'nd';
                break;
              case '3':
                postFix = 'rd';
                break;
              default:
                postFix = 'th';
                break;
            }
            return '' + day + postFix;
          }
          var shortMonth = { month: 'short' };
          return date.toLocaleString('en-GB', shortMonth) + '\n                ' + addPostFix(date.getDay()) + '\n                ' + date.getFullYear() + ',\n                ' + date.getHours() + ':' + date.getMinutes();
        }
      };
    }
  }]);

  return Teaser;
})(_react2['default'].Component);

exports['default'] = Teaser;
module.exports = exports['default'];