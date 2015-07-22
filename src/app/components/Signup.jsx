var React = require('react');
var Radium = require('radium');
var mui = require('material-ui');
var FullWidthSection = require('./common/FullWidthSection.jsx');
var SignupForm = require('./SignupForm.jsx');

class Signup extends React.Component {
  _getStyles() {
    return {
      fullWidthSection: {
        display: 'flex',
        justifyContent: 'center'
      }
    };
  }

  render() {
    var styles = this._getStyles();
    return (
      <div>
        <FullWidthSection style={styles.fullWidthSection}>
          <SignupForm />
        </FullWidthSection>
      </div>
    );
  }
}

module.exports = Radium.Enhancer(Signup);
