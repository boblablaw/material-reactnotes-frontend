import React from 'react';
import Router, { RouteHandler, Link } from 'react-router';
import Radium from 'radium';

import NoteStore from '../../stores/NoteStore';
import NoteActions from '../../actions/NoteActions';
import NoteService from '../../services/NoteService';

import Icon from 'react-geomicons';
import mui, {FloatingActionButton, Paper} from 'material-ui';
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
    let subNavWidth = Spacing.desktopKeylineIncrement * 4 + 'px';
    let pageHeight = window.innerHeight -64;
    var styles = {
      root: {
      },
      rootWhenMedium: {
        position: 'relative'
      },
      secondaryNav: {
        borderTop: 'solid 1px ' + Colors.grey300,
        overflow: 'hidden',
        height: pageHeight + 'px',
        overflowY: 'scroll',
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
        height: pageHeight + 'px',
      },
      fab: {
        position: 'fixed',
        bottom: '20',
        right: '20'
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
        <FloatingActionButton 
          style={styles.fab} 
          secondary={true} 
          onTouchTap={this._onFabClick}>+</FloatingActionButton>
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
  
  _onFabClick: function() {
    this.context.router.transitionTo('note-new');
  }
});

var NotesList = React.createClass(Radium.wrap({
  
  _getStyles: function(){
    var styles = {
      root: {
        listStyle: 'none',
        marginTop: '0em',
        padding: '0',
        textDecoration: 'none',
        color: '#999'
      }
    };

    return styles;
  },

  render: function() {
    var styles = this._getStyles();
    return (
      <ul style={styles.root}>
        {this.props.notes.map(function(note, index){
          return <Item 
                    note={note} 
                    id={note.id} 
                    title={note.title} 
                    body_text={note.body_text} 
                    body_html={note.body_html} 
                    key={"note-" + index}/>
        })}
      </ul>
    );
  }
}));

var Item = React.createClass(Radium.wrap({
  getInitialState: function() {
    return {
      zDepth: 1
    };
  },
  
  contextTypes: {
    router: React.PropTypes.func
  },

  _getStyles: function(){
    var styles = {
      root: {
/*        borderTop: 'solid 1px ' + Colors.grey300,*/
        textDecoration: 'none',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingRight: '10px',
        paddingLeft: '10px',
        position: 'relative'
      },
      title: {
        marginLeft: '10px',
        marginRight: '30px',
        paddingTop: '10px',
        fontSize: '140%',
        textDecoration: 'none',
        fontSize: '125%',
        whiteSpace: 'nowrap',
        color: Colors.cyan500
      },
      abstract: {
        margin: '10px',
        fontSize: '120%',
        height: '45px',
        color: '#999',
        textDecoration: 'none',
        overflow: 'hidden',
      },
      item: {
        height: '120px',
      },
      date: {
        marginRight: '10px',
        fontSize: '120%',
        color: '#999',
        textDecoration: 'none',
        fontStyle: 'italic',
        fontSize: '80%',
        float: 'right',
      }
    };

    return styles;
  },

  _onMouseOver: function() {
    this.setState({
      zDepth: 3
    });
  },
  
  _onItemClick: function() {
    this.context.router.transitionTo('note', { noteId: this.props.note.id });
  },

  _onMouseOut: function() {
    this.setState({
      zDepth: 1
    });
  },

  render: function() {
    var styles = this._getStyles();
    return (
      <div 
        style={styles.root} 
        onTouchTap={this._onItemClick} 
        onMouseOver={this._onMouseOver}
        onMouseOut={this._onMouseOut}>
        <Paper
          zDepth={this.state.zDepth}>
          <li style={styles.item}>
            <div style={styles.title}>{this.props.note.title}</div>
            <div style={styles.abstract}>{this.props.note['abstract']}...</div>
            <div style={styles.date}>{timeago(this.props.note.updated_at)}</div>
          </li>
        </Paper>
      </div>
    );
  }
}));

module.exports = NotesWithNav;
