import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import CardRanking from '../components/CardRanking';

class Ranking extends Component {
  state = {
    redirectLogin: false,
  };

  handleOnClickRedirectLogin = () => {
    this.setState({
      redirectLogin: true,
    });
  };

  render() {
    const { redirectLogin } = this.state;

    if (redirectLogin) return <Redirect to="/" />;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleOnClickRedirectLogin }
        >
          Jogar Novamente
        </button>

        <section>
          <CardRanking />
        </section>
      </div>
    );
  }
}

export default Ranking;
