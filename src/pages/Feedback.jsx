import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    const mNumber = 3;
    return (
      <div>
        <Header />
        { score < mNumber ? <p>Could be better...</p> : <p>Well Done!</p> }
      </div>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
