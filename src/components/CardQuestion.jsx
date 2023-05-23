import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './CardQuestion.module.css';

const correctAnswerText = 'correct-answer';

class CardQuestion extends Component {
  state = {
    questionCount: 0,
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
    const { questionCount } = this.state;
    const { results, alternatives } = this.props;

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
              <div
                data-testid="answer-options"
                className={ styles.containerAlternatives }
              >
                {
                  alternatives[questionCount].answers.map((answer) => (
                    <button
                      type="button"
                      key={ answer }
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

export default CardQuestion;
