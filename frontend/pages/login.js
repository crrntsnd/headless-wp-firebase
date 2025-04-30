import React, { Component } from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import { signin, signup } from '../src/lib/auth';

class Login extends Component {
  state = {
    email: '',
    password: '',
    username: '',
    phone: '',
    message: '',
    isSignUp: false,
  };

  static async getInitialProps() {
    return '';
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password, username, phone, isSignUp } = this.state;
    let message = '';
    this.setState({ message });

    try {
      if (isSignUp) {
        await signup({ email, password, username, phone });
      } else {
        await signin(email, password);
      }
      Router.push('/');
    } catch (error) {
      message = error.message || 'Sorry, that email and password combination is not valid.';
      this.setState({ message });
    }
  }

  toggleMode = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp,
      message: '',
    }));
  };

  render() {
    const { email, password, username, phone, message, isSignUp } = this.state;
    const { headerMenu } = this.props;

    return (
      <Layout>
        <Menu menu={headerMenu} />
        <div className="content login mh4 mv4 w-two-thirds-l center-l">
          <div>
            <h1>{isSignUp ? 'Sign Up' : 'Log in'}</h1>
            <p>Starter Kit allows you to log in via Firebase authentication.</p>
            <p><strong>Log in to view hidden posts only available to authenticated users.</strong></p>
            <p className="message mb3"><strong>{message}</strong></p>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              {isSignUp && (
                <>
                  <input
                    className="db w-100 pa3 mv3 br6 ba b--black"
                    value={username}
                    onChange={e => this.setState({ username: e.target.value })}
                    type="text"
                    placeholder="Username"
                    required
                  />
                  <input
                    className="db w-100 pa3 mv3 br6 ba b--black"
                    value={phone}
                    onChange={e => this.setState({ phone: e.target.value })}
                    type="tel"
                    placeholder="Phone"
                    required
                  />
                </>
              )}
              <input
                className="db w-100 pa3 mv3 br6 ba b--black"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="email"
                placeholder="Email"
                required
              />
              <input
                className="db w-100 pa3 mv3 br6 ba b--black"
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Password"
                required
              />
              <div className="flex justify-between items-center">
                <input
                  className="round-btn invert ba bw1 pv2 ph3"
                  type="submit"
                  value={isSignUp ? 'Sign Up' : 'Log in'}
                />
                <button
                  type="button"
                  className="round-btn ba bw1 pv2 ph3"
                  onClick={this.toggleMode}
                >
                  {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default PageWrapper(Login);
