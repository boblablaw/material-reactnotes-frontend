import React from 'react';
import FullWidthSection from './FullWidthSection';
import mui from 'material-ui';
var {Colors, Spacing, Typography} = mui.Styles;

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
