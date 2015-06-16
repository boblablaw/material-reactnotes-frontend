import React from 'react';
import Router from 'react-router';
import { RouteHandler, Link } from 'react-router';

import NoteStore from '../../stores/NoteStore';
import NoteActions from '../../actions/NoteActions';
import NoteService from '../../services/NoteService';

import mui from 'material-ui';
var Menu = mui.Menu;
var {Spacing, Colors} = mui.Styles;
var {StyleResizable, StylePropable} = mui.Mixins;

import timeago from 'timeago';

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
          <NotesList notes={this.state.notes} />
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

var NotesList = React.createClass({
  render: function() {
    return (
      <ul>
        {this.props.notes.map(function(note, index){
          return <Item note={note} key={"note-" + index}/>
        })}
      </ul>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var params = { noteId: this.props.note.id };
    return (
      <div>
        <Link to="note" params={params}>
          <li>
            <div>{this.props.note.title}</div>
            <div>{this.props.note['abstract']}...</div>
            <span>{timeago(this.props.note.updated_at)}</span>
          </li>
        </Link>
      </div>
    );
  }
});

module.exports = NotesWithNav;

/*
 <Menu
            ref="menuItems"
            zDepth={0}
            menuItemStyleSubheader={styles.itemSubheader}
            menuItems={ notes }
            selectedIndex={this._getSelectedIndex()}
            onItemTap={this._onMenuItemClick} />
*/
