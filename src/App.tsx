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
  addUserAnswer,
  incrementCurrentNumber,
  setGameOver,
  setLoading,
  incrementScore,
  startNewGame,
} from "./redux/actions";

export type Answer = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correct_answer: string;
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
    console.log(newQuestions)

    dispatch(startNewGame(newQuestions));
    dispatch(setLoading(false));
  };

  const checkAnswer = (answer:string) => {
    if (!isGameOver) {
      
      const isCorrect = questions[currentNumber].correct_answer === answer;
      if (isCorrect) {
        dispatch(incrementScore());
      }
      const answerContext = {
        question: questions[currentNumber].question,
        userAnswer: answer,
        isCorrect: isCorrect,
        correct_answer: questions[currentNumber].correct_answer,
      };
      dispatch(addUserAnswer(answerContext));
    }
  };

  const nextQuestion = () => {
    dispatch(incrementCurrentNumber());
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {isGameOver || userAnswers.length === TOTAL_QUESTIONS? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!isGameOver ? <p className="score">Score: {score}</p> : null}
        {isLoading ? <p>Loading...</p> : null}
        {!isLoading && !isGameOver ? (
          <>
            <QuestionCard
              data-testid="questionCard" 
              questionNum={currentNumber + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[currentNumber].question}
              answers={questions[currentNumber].answers}
              userAnswer={userAnswers ? userAnswers[currentNumber] : undefined}
              callback={checkAnswer}
            />
            {userAnswers.length === currentNumber + 1 &&
            currentNumber !== TOTAL_QUESTIONS - 1 ? (
              <button className="next" onClick={nextQuestion}>
                Next Question
              </button>
            ) : null}
          </>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
