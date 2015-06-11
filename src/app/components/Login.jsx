var React = require('react');
var Radium = require('radium');
var mui = require('material-ui');
var FullWidthSection = require('./common/FullWidthSection.jsx');
var LoginForm = require('./LoginForm.jsx');
var {Spacing, Typography} = mui.Styles;

class Login extends React.Component {
  getStyles() {
    return {
      root: {
/*        paddingTop: Spacing.desktopKeylineIncrement*/
      },
      fullWidthSection: {
        display: 'flex',
        justifyContent: 'center'
      }
    };
  }

  render() {
    var styles = this.getStyles();
    return (
      <div style={styles.root}>
      <FullWidthSection style={styles.fullWidthSection}>
          <LoginForm />
        </FullWidthSection>
      </div>
    );
  }
}

Login.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Radium.Enhancer(Login);
