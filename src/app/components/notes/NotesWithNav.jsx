import React from 'react';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

import NoteStore from '../../stores/NoteStore';
import NoteActions from '../../actions/NoteActions';
import NoteService from '../../services/NoteService';

import mui from 'material-ui';
var Menu = mui.Menu;
var {Spacing, Colors} = mui.Styles;
var {StyleResizable, StylePropable} = mui.Mixins;

var notes = [
  { id: 1, text: 'Note Title 1', data: '5735 Broadway Terrace' },
  { id: 2, text: 'Note Title 2', data: 'Announcement' },
  { id: 3, text: 'Note Title 3', data: '(123) 456-7890' }
];

var NotesWithNav = React.createClass({
  mixins: [StyleResizable, StylePropable, Router.State],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    menuItems: React.PropTypes.array
  },

  getInitialState: function() {
    return {
      notes: NoteStore.getAllNotes(),
      errors: []
    };
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
    NoteService.loadNotes();
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({
      notes: NoteStore.getAllNotes(),
      errors: NoteStore.getErrors()
    });
  },

  getStyles: function(){
    var subNavWidth = Spacing.desktopKeylineIncrement * 3.5 + 'px';
    var styles = {
      root: {
      },
      rootWhenMedium: {
        position: 'relative'
      },
      secondaryNav: {
        borderTop: 'solid 1px ' + Colors.grey300,
        overflow: 'hidden'
      },
      content: {
        boxSizing: 'border-box',
        padding: Spacing.desktopGutter + 'px',
        maxWidth: (Spacing.desktopKeylineIncrement * 14) + 'px'
      },
      secondaryNavWhenMedium: {
        borderTop: 'none',
        position: 'absolute',
        top: 0,
        width: subNavWidth
      },
      contentWhenMedium: {
        marginLeft: subNavWidth,
        borderLeft: 'solid 1px ' + Colors.grey300,
        minHeight: '800px'
      },
      itemSubheader: {
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeStyles(styles.root, styles.rootWhenMedium);
      styles.secondaryNav = this.mergeStyles(styles.secondaryNav, styles.secondaryNavWhenMedium);
      styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
    }

    return styles;
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <div style={styles.root}>
        <div style={styles.content}>
        <RouteHandler />
        </div>
        <div style={styles.secondaryNav}>
          <Menu
            ref="menuItems"
            zDepth={0}
            menuItemStyleSubheader={styles.itemSubheader}
            menuItems={ notes }
            selectedIndex={this._getSelectedIndex()}
            onItemTap={this._onMenuItemClick} />
        </div>
      </div>
    );
  },

  _getSelectedIndex: function() {
    var noteItems = notes;
    var currentItem;

    for (var i = noteItems.length - 1; i >= 0; i--) {
      currentItem = noteItems[i];
      if (currentItem.id && (currentItem.id.toString() == this.getParams().noteId )) return i;
    }
  },

  _onMenuItemClick: function(e, index, item) {
    this.context.router.transitionTo('note', { noteId: item.id });
  }
});

module.exports = NotesWithNav;
