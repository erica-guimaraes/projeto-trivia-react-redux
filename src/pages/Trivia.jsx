import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import CardQuestion from '../components/CardQuestion';
import { requestResetState } from '../redux/actions';

class Trivia extends Component {
  state = {
    results: [],
    alternatives: [],
    invalidToken: false,
    isRedirectToFeedback: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    dispatch(requestResetState());

    const data = await this.getResponseTrivia();
    this.setState({ results: data.results });

    this.buildTheAlternatives(data.results);

    if (data.response_code !== 0) {
      localStorage.removeItem('token');
      this.setState({ invalidToken: true });
    }
  }

  getResponseTrivia = async () => {
    const token = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  };

  buildTheAlternatives = (dataResults) => {
    const alternatives = dataResults.map((obj) => {
      const correctAnswer = obj.correct_answer;
      const incorrectAnswers = obj.incorrect_answers;
      let answers = [...incorrectAnswers];
      answers.push(correctAnswer);
      const magicNumber = 0.5;
      answers = answers.sort(() => Math.random() - magicNumber);
      const objAnswers = { answers };
      objAnswers[obj.correct_answer] = true;
      incorrectAnswers.forEach((answer) => { objAnswers[answer] = false; });
      return objAnswers;
    });
    this.setState({ alternatives });
  };

  hasRedirectToFeedbackPage = () => {
    this.setState({ isRedirectToFeedback: true });
  };

  render() {
    const { results, alternatives, invalidToken, isRedirectToFeedback } = this.state;

    if (isRedirectToFeedback) return <Redirect to="/feedback" />;
    if (invalidToken) return <Redirect to="/" />;
    return (
      <>
        <Header />
        <main>
          <CardQuestion
            results={ results }
            alternatives={ alternatives }
            hasRedirectToFeedbackPage={ this.hasRedirectToFeedbackPage }
          />
        </main>
      </>
    );
  }
}

Trivia.propTypes = {
  dispatch: PropTypes.func.isRequired,
}.isRequired;

export default connect()(Trivia);
