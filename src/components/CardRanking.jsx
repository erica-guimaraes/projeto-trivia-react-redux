import React, { Component } from 'react';

class CardRanking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  render() {
    const { ranking } = this.state;

    return (
      <div>
        {
          ranking.length > 0 && (
            ranking.map((player, index) => (
              <div key={ index }>
                <div>
                  <img src={ player.picture } alt={ `Avatar do Player ${player.name}` } />
                </div>
                <div>
                  <strong
                    data-testid={ `player-name-${index}` }
                  >
                    { player.name }
                  </strong>
                </div>
                <div>
                  <strong
                    data-testid={ `player-score-${index}` }
                  >
                    { player.score }
                  </strong>
                </div>
              </div>
            ))
          )
        }
      </div>
    );
  }
}

export default CardRanking;
