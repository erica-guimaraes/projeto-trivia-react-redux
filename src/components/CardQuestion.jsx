import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './CardQuestion.module.css';
import { requestTime } from '../redux/actions';

const correctAnswerText = 'correct-answer';

class CardQuestion extends Component {
  state = {
    questionCount: 0,
    isDisabled: false,
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

  handleOnClickChangeColor = ({ target }) => {
    const buttons = [...target.parentNode.childNodes];
    buttons.forEach((button) => {
      const attribute = button.getAttribute('data-testid');
      if (attribute === correctAnswerText) {
        button.classList.add(styles.buttonAlternativeTrue);
      }
      if (attribute !== correctAnswerText) {
        button.classList.add(styles.buttonAlternativeFalse);
      }
    });
  };

  render() {
    const { questionCount, isDisabled } = this.state;
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
                        (event) => this.handleOnClickChangeColor(event)
                      }
                    >
                      {answer}
                    </button>
                  ))
                }
              </div>
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
});

export default connect(mapStateToProps)(CardQuestion);
