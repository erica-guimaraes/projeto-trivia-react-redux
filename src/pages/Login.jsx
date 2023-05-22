import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
    redirect: false,
  };

  validateFields = () => {
    const { name, email } = this.state;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = regexEmail.test(email);
    const validName = name.length > 0;

    if (validEmail && validName) {
      this.setState({ disabled: false });
    }
  };

  handleOnChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.validateFields);
  };

  handleOnClickRedirect = async () => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    this.setState({ redirect: true });
  };

  render() {
    const { disabled, redirect } = this.state;

    if (redirect) return <Redirect to="/trivia" />;
    return (
      <main>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              onChange={ this.handleOnChange }
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              id="email"
              onChange={ this.handleOnChange }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ this.handleOnClickRedirect }
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
