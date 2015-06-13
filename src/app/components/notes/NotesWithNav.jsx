import React from 'react';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

import mui from 'material-ui';
var Menu = mui.Menu;
var {Spacing, Colors} = mui.Styles;
var {StyleResizable, StylePropable} = mui.Mixins;

/*export default AuthenticatedComponent(class Home extends React.Component {*/

var notes = [
  {id: 1, title: "Title", abstract: "abstract", updated_at: "1 hour ago", body: "body text"},
  {id: 2, title: "Title2", abstract: "abstract2", updated_at: "2 hours ago", body: "body text2"}
];

notes = [
  { id: 1, text: 'Note Title 1', data: '5735 Broadway Terrace', route: 'note' },
  { id: 2, text: 'Note Title 2', data: 'Announcement', route: 'note' },
  { id: 3, text: 'Note Title 3', data: '(123) 456-7890', route: 'note' }
];

var NotesWithNav = React.createClass({
  mixins: [StyleResizable, StylePropable, Router.State],

  contextTypes: {
    router: React.PropTypes.func
  },

  propTypes: {
    menuItems: React.PropTypes.array
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
    var menuItems = notes;
    var currentItem;

    for (var i = menuItems.length - 1; i >= 0; i--) {
      currentItem = menuItems[i];
      if (currentItem.id && (currentItem.id.toString() == this.getPath().slice(-1))) return i;
    }
  },

  _onMenuItemClick: function(e, index, item) {
    this.context.router.transitionTo(item.route, { noteId: item.id });
  }

});

module.exports = NotesWithNav;
