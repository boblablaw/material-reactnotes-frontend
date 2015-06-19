import React from 'react';
import MediumEditor from 'medium-editor';

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
      _this.change(dom.innerHTML);
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
    return React.createElement(this.props.tag, {
      className: this.props.className,
      contentEditable: true,
      dangerouslySetInnerHTML: { __html: this.state.text }
    });
  },

  change: function(text) {
    if (this.props.onChange) this.props.onChange(text);
  },
});

module.exports = Editor;
