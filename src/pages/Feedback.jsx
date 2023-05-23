import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  state = {
    loading: false,
  };

  handleClick = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const { loading } = this.state;
    const { assertions, score } = this.props;
    const mNumber = 3;
    if (loading) return <Redirect to="/" />;
    return (
      <div>
        <Header />
        {
          assertions < mNumber
            ? <p data-testid="feedback-text">
              Could be better...
            </p>
            : <p data-testid="feedback-text">Well Done!</p>
        }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleClick }
        >
          Play Again
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
