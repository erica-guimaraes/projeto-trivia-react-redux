import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import md5 from 'crypto-js/md5';
import styles from './CardQuestion.module.css';
import {
  requestAddScoreAndAssertions, requestTime,
} from '../redux/actions';

const correctAnswerText = 'correct-answer';
const dataTestIdText = 'data-testid';

class CardQuestion extends Component {
  state = {
    questionCount: 0,
    isDisabled: false,
    isNextButton: false,
    isRedirectToFeedback: false,
  };

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer = async () => {
    const firstSecond = 1000;

    const count = setInterval(async () => {
      let { timer } = this.props;
      timer -= 1;
      const { dispatch } = this.props;
      dispatch(requestTime(timer));
      if (timer === 0) {
        clearInterval(count);
        this.setState({
          isDisabled: true,
        });
      }
    }, firstSecond);
  };

  handleOnClickAnswer = (event) => {
    this.handleOnClickChangeColor(event);
    this.handleOnClickScore(event);

    this.setState({ isNextButton: true });
  };

  handleOnClickChangeColor = ({ target }) => {
    const buttons = [...target.parentNode.childNodes];
    buttons.forEach((button) => {
      const attribute = button.getAttribute(dataTestIdText);
      if (attribute === correctAnswerText) {
        button.classList.add(styles.buttonAlternativeTrue);
      }
      if (attribute !== correctAnswerText) {
        button.classList.add(styles.buttonAlternativeFalse);
      }
    });
  };

  handleOnClickScore = ({ target }) => {
    const attribute = target.getAttribute(dataTestIdText);

    let isRight = false;
    if (attribute === correctAnswerText) {
      isRight = true;
    }
    console.log(isRight);
    if (isRight) {
      const { questionCount } = this.state;
      const { timer, results, score, dispatch } = this.props;
      const { difficulty } = results[questionCount];

      const constDifficulty = 10;
      const hardDifficulty = 3;

      switch (difficulty) {
      case 'easy':
        dispatch(requestAddScoreAndAssertions(constDifficulty + (timer * (1))));
        break;
      case 'medium':
        dispatch(requestAddScoreAndAssertions(constDifficulty + (timer * (2))));
        break;
      case 'hard':
        dispatch(
          requestAddScoreAndAssertions(constDifficulty + (timer * (hardDifficulty))),
        );
        break;
      default:
        return score;
      }
    }
  };

  addPlayerToRanking = (gravatarEmail, name, score) => {
    const md5EmailHash = md5(gravatarEmail).toString();
    const picture = `https://www.gravatar.com/avatar/${md5EmailHash}`;

    const player = {
      name,
      score,
      picture,
    };

    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    if (localStorage.getItem('ranking')) {
      const rankingList = JSON.parse(localStorage.getItem('ranking'));
      rankingList.push(player);
      rankingList.sort((a, b) => b.score - a.score);
      localStorage.setItem('ranking', JSON.stringify(rankingList));
    }
  };

  handleOnClickChangeAnswer = () => {
    const { questionCount } = this.state;
    const { dispatch, gravatarEmail, name, score } = this.props;
    const maxCountNumber = 4;

    if (questionCount < maxCountNumber) {
      this.setState((prevState) => ({
        questionCount: prevState.questionCount + 1,
      }));
    }

    const thirty = 30;
    dispatch(requestTime(thirty));

    if (questionCount === maxCountNumber) {
      this.addPlayerToRanking(gravatarEmail, name, score);
      this.setState({ isRedirectToFeedback: true });
    }
  };

  render() {
    const { questionCount, isDisabled, isNextButton, isRedirectToFeedback } = this.state;
    const { results, alternatives, timer } = this.props;

    if (isRedirectToFeedback) return <Redirect to="/feedback" />;
    return (
      <section>
        {
          results.length > 0 ? (
            <>
              <div>
                <h3
                  data-testid="question-category"
                >
                  { results[questionCount].category }
                </h3>
                <p>
                  <strong
                    data-testid="question-text"
                  >
                    { results[questionCount].question }
                  </strong>
                </p>
              </div>

              <div>
                Timer:
                { ` ${timer}` }
              </div>

              <div
                data-testid="answer-options"
                className={ styles.containerAlternatives }
              >
                {
                  alternatives[questionCount].answers.map((answer) => (
                    <button
                      type="button"
                      key={ answer }
                      disabled={ isDisabled }
                      data-testid={
                        alternatives[questionCount][answer] ? correctAnswerText
                          : `wrong-answer-${results[questionCount]
                            .incorrect_answers.indexOf(answer)}`
                      }
                      onClick={
                        (event) => this.handleOnClickAnswer(event)
                      }
                    >
                      {answer}
                    </button>
                  ))
                }
              </div>

              {
                isNextButton && (
                  <div>
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.handleOnClickChangeAnswer }
                    >
                      Next
                    </button>
                  </div>
                )
              }
            </>
          ) : ''
        }

      </section>
    );
  }
}

CardQuestion.propTypes = {
  alternatives: PropTypes.object,
  results: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = ({ player }) => ({
  timer: player.timer,
  score: player.score,
  name: player.name,
  gravatarEmail: player.gravatarEmail,
  numberOfPlayer: player.numberOfPlayer,
});

export default connect(mapStateToProps)(CardQuestion);
