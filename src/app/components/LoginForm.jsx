import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Router from 'react-router';
import Auth from '../services/LoginService'
import mui from 'material-ui';

let Link = Router.Link;
let Paper = mui.Paper;
let RaisedButton = mui.RaisedButton;
let TextField = mui.TextField;

let {StylePropable, StyleResizable} = mui.Mixins;
let {Colors, Spacing, Transitions, Typography} = mui.Styles;

let LoginForm = React.createClass({
  mixins: [StylePropable, StyleResizable, React.addons.LinkedStateMixin],
  
  getInitialState: function() {
    return { canSubmit: false };
  },

  login: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    Auth.login(this.state.email, this.state.password)
      .catch(function(err) {
        alert("There's an error logging in");
        console.log("Error logging in", err);
      });
  },
  
  render: function() {
    var styles = this._getStyles();
    return (
      <form style={styles.inputs} onSubmit={this._onSubmit}>
        <TextField
          type="email"
          name="email"
          ref="email"
          valueLink={this.linkState('email')}
          floatingLabelText="Enter Your E-Mail Address"
          hintText="E-Mail"/><br />
        <TextField
          type="password"
          name="password"
          ref="password"
          valueLink={this.linkState('password')}
          floatingLabelText="Enter Your Password"
          hintText="Password"/><br />
        <RaisedButton 
          label="Submit" 
          secondary={true}
          onClick={this.login}
          style={styles.button} />
        <span style={styles.span}>
          Don't have an account? <Link to="signup"> Sign Up!</Link>
        </span>
      </form>
    );
  },
  
  _getStyles: function() {
    let desktopGutter = Spacing.desktopGutter;
    let desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
    let styles = {
      root: {
        transition: Transitions.easeOut(),
        width: '300px',
        margin: '0 auto ' + desktopGutter + ' auto'
      },
      inputs: {
        padding: '0px',
      },
      button: {
        marginTop: '10px',
        float: 'right'
      },
      labels: {
        fontSize: '15px',
        paddingTop: '0px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      span: {
        paddingTop: '10px',
        clear: 'both',
        display: 'block'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) || 
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeAndPrefix(
        styles.root,
        styles.rootWhenMedium
      );
    }

    return styles;
  },
});

module.exports = LoginForm;
