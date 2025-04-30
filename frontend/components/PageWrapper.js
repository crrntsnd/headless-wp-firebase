import React from 'react';
import WPAPI from 'wpapi';
import Config from '../config';
import { auth } from '../src/lib/firebase';

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');

const PageWrapper = Comp =>
  class extends React.Component {
    static async getInitialProps(args) {
      const [headerMenu, childProps] = await Promise.all([
        wp.menus().id('header-menu'),
        Comp.getInitialProps ? Comp.getInitialProps(args) : {},
      ]);

      return {
        headerMenu,
        ...childProps,
      };
    }

    componentDidMount() {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          this.setState({ user });
        } else {
          // User is signed out
          this.setState({ user: null });
        }
      });
    }

    componentWillUnmount() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
    }

    render() {
      return <Comp {...this.props} user={this.state?.user} />;
    }
  };

export default PageWrapper;
