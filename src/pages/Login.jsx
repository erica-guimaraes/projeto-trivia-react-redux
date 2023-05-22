import React, { Component } from 'react';

class Login extends Component {
  state = {
    name: '',
    email: '',
    disabled: true,
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

  render() {
    const { disabled } = this.state;

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
            data-testid="btn-play"
            disabled={ disabled }
          >
            Play
          </button>
        </form>
      </main>
    );
  }
}

export default Login;
