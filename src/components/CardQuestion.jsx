import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CardQuestion extends Component {
  state = {
    questionCount: 0,
  };

  render() {
    const { questionCount } = this.state;
    const { results, alternatives } = this.props;

    console.log(alternatives[questionCount]);

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
              <div data-testid="answer-options">
                {
                  alternatives[questionCount].answers.map((answer) => (
                    <button
                      key={ answer }
                      data-testid={
                        alternatives[questionCount][answer] ? 'correct-answer'
                          : `wrong-answer-${results[questionCount]
                            .incorrect_answers.indexOf(answer)}`
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
