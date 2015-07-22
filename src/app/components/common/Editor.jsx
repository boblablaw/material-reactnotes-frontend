import React from 'react';
import MediumEditor from 'medium-editor';

import mui from 'material-ui';
var {Spacing, Colors, Transitions} = mui.Styles;
var {StyleResizable, StylePropable} = mui.Mixins;

var Editor = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.text
    };
  },

  getDefaultProps: function() {
    return {
      tag: 'div'
    };
  },

  componentDidMount: function() {
    var _this = this;
    var dom = this.getDOMNode();
    this.medium = new MediumEditor(dom, this.props.options);
    this.medium.subscribe('editableInput', function(e) {
      _this._updated = true;
      _this._onChange(dom.innerHTML);
    });
  },

  componentWillUnmount: function() {
    this.medium.destroy();
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.text !== this.state.text && !this._updated) {
      this.setState({ text: nextProps.text });
    }

    if (this._updated) this._updated = false;
  },

  render: function() {
    var styles = this._getStyles();
    return React.createElement(this.props.tag, {
      className: this.props.className,
      style: styles.bodyTextField,
      contentEditable: true,
      dangerouslySetInnerHTML: { __html: this.state.text }
    });
  },
  
  _getStyles() {
    let bodyHeight = window.innerHeight - 215;
    let styles = {
      bodyTextField: {
        width: '100%',
        display: 'block',
        fontSize: '110%',
        height: bodyHeight + 'px',
        outline: 'none'
      }
    };
    return styles;
  },

  _onChange: function(text) {
    if (this.props.onChange) this.props.onChange(text);
  },
});

module.exports = Editor;
