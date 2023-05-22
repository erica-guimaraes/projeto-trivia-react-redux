import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    emailHash: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const emailHash = md5(email).toString();
    this.setState({ emailHash });
  }

  render() {
    const { emailHash } = this.state;
    const { name, score } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${emailHash}` }
          alt="Avatar"
        />
        <strong
          data-testid="header-player-name"
        >
          { name }
        </strong>
        <span
          data-testid="header-score"
        >
          { score }
          {' '}
          pontos
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  name: player.name,
  email: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
