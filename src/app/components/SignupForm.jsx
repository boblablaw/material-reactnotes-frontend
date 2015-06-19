import React from 'react/addons';
import ReactMixin from 'react-mixin';
import Router from 'react-router';
import Auth from '../services/LoginService'
import mui from 'material-ui';

let Link = Router.Link;
let Paper = mui.Paper;
let RaisedButton = mui.RaisedButton;
let TextField = mui.TextField;

let { StylePropable, StyleResizable } = mui.Mixins;
let { Colors, Spacing, Transitions, Typography } = mui.Styles;

var SignupForm = React.createClass({
  mixins: [StylePropable, StyleResizable, React.addons.LinkedStateMixin],
  
  getInitialState: function() {
    return { canSubmit: false };
  },

  signup: function(e) {
    e.preventDefault();
    this.setState({ errors: [] });
    Auth.signup(this.state.email, this.state.username, this.state.password)
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
          type="text"
          name="username"
          ref="username"
          valueLink={this.linkState('username')}
          floatingLabelText="Enter Your Username"
          hintText="Username"/><br />
        <TextField
          type="password"
          name="password"
          ref="password"
          valueLink={this.linkState('password')}
          floatingLabelText="Enter Your Password"
          hintText="Password"/><br />
        <TextField
          type="password"
          name="password confirmation"
          ref="passwordConf"
          valueLink={this.linkState('passwordConf')}
          floatingLabelText="Password Confirmation"
          hintText="Password Confirmation"/><br />
        <RaisedButton 
          label="Submit" 
          secondary={true}
          onClick={this.signup}
          style={styles.button} />
        <span style={styles.span}>
          Already have an account? <Link to="login"> Login!</Link>
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
        padding: '20px',
      },
      button: {
        marginTop: '10px',
        float: 'right'
      },
      labels: {
        fontSize: '15px',
        paddingTop: '50px',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
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

module.exports = SignupForm;
