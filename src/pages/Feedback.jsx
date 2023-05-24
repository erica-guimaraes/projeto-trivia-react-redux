import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';
import { requestResetState } from '../redux/actions';

class Feedback extends Component {
  state = {
    redirectLogin: false,
    redirectRanking: false,
  };

  handleOnClickPlayAgain = () => {
    const { dispatch } = this.props;

    dispatch(requestResetState());

    this.setState({
      redirectLogin: true,
    });
  };

  handleOnClickRedirectRanking = () => {
    this.setState({
      redirectRanking: true,
    });
  };

  render() {
    const { redirectLogin, redirectRanking } = this.state;
    const { assertions, score } = this.props;
    const mNumber = 3;
    if (redirectLogin) return <Redirect to="/" />;
    if (redirectRanking) return <Redirect to="/ranking" />;
    return (
      <div>
        <Header />
        {
          assertions < mNumber
            ? (
              <p data-testid="feedback-text">
                Could be better...
              </p>
            )
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleOnClickPlayAgain }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.handleOnClickRedirectRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
