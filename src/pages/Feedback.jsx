import React, { Component } from 'react';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score } = this.props;
    return (
      <div>
        <Header />

      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  score: player.score,
});

export default connect(mapStateToProps)(Feedback);
