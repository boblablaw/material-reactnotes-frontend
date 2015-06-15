var React = require('react');
import FullWidthSection from './FullWidthSection';

import mui from 'material-ui';
var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();
var { AppBar, AppCanvas, Menu, IconButton, MenuItem } = mui;

var Footer = React.createClass({
  getStyles() {
    var darkWhite = Colors.darkWhite;
    return {
      footer: {
        backgroundColor: Colors.grey900,
        textAlign: 'center'
      },
      a: {
        color: darkWhite
      },
      p: {
        margin: '0 auto',
        padding: '0',
        color: Colors.lightWhite,
        maxWidth: '335px'
      },
      iconButton: {
        color: darkWhite
      }
    };
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <FullWidthSection style={styles.footer}>
        <p style={styles.p}>
          Footer stuff goes here
        </p>
      </FullWidthSection>
    );
  }
});

module.exports = Footer;
