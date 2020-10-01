import React from "react";
// import loader from './images/loader.svg'
// import { useTheme } from "styled-components";
import { fetchQuizQuestions, Difficulty } from "./API";
//Styles
import { GlobalStyle, Wrapper } from "./App.styles";
//Components
import QuestionCard from "./components/QuestionCard";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "./redux/reducers";

import {
  setCurrentNumber,
  setGameOver,
  setLoading,
  setQuestions,
  setScore,
  setUserAnswers,
} from "./redux/actions";

export type Answer = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const isLoading = useSelector((state: AppState) => state.game.loading);
  const questions = useSelector((state: AppState) => state.game.questions);
  const userAnswers = useSelector((state: AppState) => state.game.userAnswers);
  const score = useSelector((state: AppState) => state.game.score);
  const currentNumber = useSelector(
    (state: AppState) => state.game.currentNumber
  );
  const isGameOver = useSelector((state: AppState) => state.game.gameOver);
  const dispatch = useDispatch();

  const startQuiz = async () => {
    dispatch(setLoading(true));
    dispatch(setGameOver(false));

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.Easy
    );

    dispatch(setQuestions(newQuestions));
    dispatch(setScore(0));
    dispatch(setUserAnswers([]));
    dispatch(setCurrentNumber(0));
    dispatch(setLoading(false));
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isGameOver) {
      e.preventDefault();
      //user answer
      const answer = e.currentTarget.value;
      const isCorrect = questions[currentNumber].correctAnswer === answer;
      if (isCorrect) {
        dispatch(setScore(score + 1));
      }
      const answerContext = {
        question: questions[currentNumber].question,
        userAnswer: answer,
        isCorrect: isCorrect,
        correctAnswer: questions[currentNumber].correctAnswer,
      };
      dispatch(setUserAnswers([...userAnswers, answerContext]));
    }
  };

  const nextQuestion = () => {
    
    if (userAnswers.length === TOTAL_QUESTIONS) {
      dispatch(setGameOver(true));
    } else {
      dispatch(setCurrentNumber(currentNumber + 1));
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {isGameOver  ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!isGameOver ? <p className="score">Score: {score}</p> : null}
        {isLoading ? (
        <p>Loading...</p>
        ) : null}
        {!isLoading && !isGameOver ? (
          <QuestionCard
            questionNum={currentNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[currentNumber].question}
            answers={questions[currentNumber].answers}
            userAnswer={userAnswers ? userAnswers[currentNumber] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!isGameOver &&
        !isLoading &&
        userAnswers.length === currentNumber + 1 &&
        currentNumber !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
