import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
    redirectTrivia: false,
    redirectSettings: false,
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

  handleOnClickRedirectTrivia = async () => {
    const URL = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL);
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    this.setState({ redirectTrivia: true });
  };

  handleOnClickRedirectSettings = () => { this.setState({ redirectSettings: true }); };

  render() {
    const { disabled, redirectTrivia, redirectSettings } = this.state;

    if (redirectSettings) return <Redirect to="/settings" />;
    if (redirectTrivia) return <Redirect to="/trivia" />;
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
            onClick={ this.handleOnClickRedirectTrivia }
          >
            Play
          </button>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleOnClickRedirectSettings }
          >
            Configurações
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
