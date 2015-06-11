var React = require('react');
var Radium = require('radium');
var mui = require('material-ui');
var FullWidthSection = require('./common/FullWidthSection.jsx');
var SignupForm = require('./SignupForm.jsx');
var {Spacing, Typography} = mui.Styles;

class Signup extends React.Component {
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
          <SignupForm />
        </FullWidthSection>
      </div>
    );
  }
}

Signup.contextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Radium.Enhancer(Signup);
