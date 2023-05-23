import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const mNumber = 3;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
});

export default connect(mapStateToProps)(Feedback);
