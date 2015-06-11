import React from 'react';
import Router from 'react-router';
import mui from 'material-ui';
import WelcomeFeature from './WelcomeFeature';
import FullWidthSection from './common/FullWidthSection';

let RaisedButton = mui.RaisedButton;
let ThemeManager = new mui.Styles.ThemeManager().getCurrentTheme();
let {StylePropable, StyleResizable} = mui.Mixins;
let {Colors, Spacing, Typography} = mui.Styles;

var Welcome = React.createClass({
  mixins: [StylePropable, StyleResizable],

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    var style = {
/*      paddingTop: Spacing.desktopKeylineIncrement*/
    };
    return (
      <div style={style}>
        {this._getWelcomePageHero()}
        {this._getWelcomePurpose()}
        {this._getWelcomeFeatures()}
        {this._getWelcomeContribute()}
      </div>
    );
  },

  _getWelcomePageHero: function() {
    var styles = {
      root: {
        backgroundColor: Colors.cyan500,
        overflow: 'hidden'
      },
      svgLogo: {
        marginLeft: (window.innerWidth * 0.5) - 130 + 'px',
        width: '420px'
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: '575px'
      },
      label: {
        color: ThemeManager.palette.primary1Color,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px'
      },
      demoStyle: {
        margin: '16px 32px 0px 32px'
      },
      h1: {
        color: Colors.darkWhite,
        fontWeight: Typography.fontWeightLight,
      },
      h2: {
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
      },
      nowrap: {
        whiteSpace: 'nowrap'
      },
      taglineWhenLarge: {
        marginTop: '32px'
      },
      h1WhenLarge: {
        fontSize: '56px'
      },
      h2WhenLarge: {
        //.mui-font-style-headline;
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px'
      }
    };

    styles.h2 = this.mergeStyles(styles.h1, styles.h2);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
      styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
      styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
    }

    return (
      <FullWidthSection style={styles.root}>
          <img style={styles.svgLogo} src="images/material-ui-logo.svg" />
          <div style={styles.tagline}>
            <h1 style={styles.h1}>ReactNotes</h1>
            <h2 style={styles.h2}>
              An Evernote clone <span style={styles.nowrap}>
              built on ReactJS and using</span> <span style={styles.nowrap}>
              Google&apos;s Material Design</span>
            </h2>
            <RaisedButton
              label="Login" 
              onTouchTap={this._onLoginClick}
              linkButton={true} 
              style={styles.demoStyle} 
              labelStyle={styles.label}/>
            <RaisedButton 
              label="Signup" 
              onTouchTap={this._onSignupClick}
              linkButton={true}
              style={styles.githubStyle} 
              labelStyle={styles.label}/>
          </div>
      </FullWidthSection>
    );
  },

  _getWelcomePurpose: function() {
    var styles = {
      root: {
        backgroundColor: Colors.grey200
      },
      content: {
        maxWidth: '700px',
        padding: 0,
        margin: '0 auto',
        fontWeight: Typography.fontWeightLight,
        //.mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        textAlign: 'center',
        color: Typography.textDarkBlack
      }
    };

    return (
      <FullWidthSection style={styles.root} useContent={true} contentStyle={styles.content} contentType="p" className="home-purpose">
        Material-UI came about from our love of&nbsp;
        <a href="http://facebook.github.io/react/">React</a> and&nbsp;
        <a href="https://www.google.com/design/spec/material-design/introduction.html">
          Google's Material Design
        </a>. We're currently using it on a project at&nbsp;
        <a href="https://www.call-em-all.com/">Call-Em-All</a> and plan on adding to it 
        and making it better in the coming months.
      </FullWidthSection>
    );
  },

  _getWelcomeFeatures: function() {
    var styles = {maxWidth: '906px'};
    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <WelcomeFeature heading="Get Started" route="login" img="images/get-started.svg" firstChild={true}/>
        <WelcomeFeature heading="Customization" route="login" img="images/css-framework.svg" />
        <WelcomeFeature heading="Components" route="login" img="images/components.svg" lastChild={true}/>
      </FullWidthSection>
    );
  },

  _getWelcomeContribute: function() {
    var styles = {
      root: {
        backgroundColor: Colors.grey200,
        textAlign: 'center'
      },
      h3: {
        margin: '0',
        padding: '0',
        fontWeight: Typography.fontWeightLight
      },
      button: {
        marginTop: 32
      }
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          Want to help make this <span style={styles.nowrap}>project awesome?</span> <span style={styles.nowrap}>Check out our repo.</span>
        </h3>
        <RaisedButton label="GitHub" primary={true} linkButton={true} href="https://github.com/callemall/material-ui" style={styles.button}/>
      </FullWidthSection>
    );
  },

  _onLoginClick: function() {
    this.context.router.transitionTo('login');
  },
  
  _onSignupClick: function() {
    this.context.router.transitionTo('signup');
  }
});

module.exports = Welcome;