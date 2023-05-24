import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CardQuestion.module.css';
import { requestAddScore, requestTime } from '../redux/actions';

const correctAnswerText = 'correct-answer';
const dataTestIdText = 'data-testid';

class CardQuestion extends Component {
  state = {
    questionCount: 0,
    isDisabled: false,
    isNextButton: false,
  };

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer = async () => {
    const firstSecond = 1000;
    let { timer } = this.props;

    const count = setInterval(async () => {
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

    if (isRight) {
      const { questionCount } = this.state;
      const { timer, results, score, dispatch } = this.props;
      const { difficulty } = results[questionCount];

      const ten = 10;
      const three = 3;

      switch (difficulty) {
      case 'easy':
        dispatch(requestAddScore(ten + (timer * (1))));
        break;
      case 'medium':
        dispatch(requestAddScore(ten + (timer * (2))));
        break;
      case 'hard':
        dispatch(requestAddScore(ten + (timer * (three))));
        break;
      default:
        return score;
      }
    }
  };

  handleOnClickChangeAnswer = () => {
    // const { questionCount } = this.state;
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      questionCount: prevState.questionCount + 1,
    }));

    const thirty = 30;

    dispatch(requestTime(thirty));

    // if (questionCount === 5) {}
  };

  render() {
    const { questionCount, isDisabled, isNextButton } = this.state;
    const { results, alternatives, timer } = this.props;

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
});

export default connect(mapStateToProps)(CardQuestion);
