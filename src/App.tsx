import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useTheme } from "styled-components";
import { fetchQuizQuestions } from "./API";

//Styles
import { GlobalStyle, Wrapper } from "./App.styles";
//Components
import QuestionCard from "./components/QuestionCard";
//Types
import { Difficulty } from "./API";
import {
  setCurrentNumber,
  setGameOver,
  setLoading,
  setQuestions,
  setScore,
  setUserAnswers,
} from "./redux/actions";

import { GameState } from "./redux/types";

export type AnswerObject = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const isLoading = useSelector((state: GameState) => state.loading);
  const state = useSelector((state: GameState) => state);
  const questions = useSelector((state: GameState) => state.questions);
  const userAnswers = useSelector((state: GameState) => state.userAnswers);
  const score = useSelector((state: GameState) => state.score);
  const currentNumber = useSelector((state: GameState) => state.currentNumber);
  const isGameOver = useSelector((state: GameState) => state.gameOver);
  const dispatch = useDispatch();
  // const [questions, setQuestions] = useState<QuestionState[]>([]);
  // const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);

  //REDUX TEST

  const startQuiz = async () => {
    dispatch(setLoading(true));
    dispatch(setGameOver(false));

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.Easy
    );
    //Cia galetu but reset game actionas
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
      const isCorrect = questions[currentNumber].correct_answer === answer;
      if (isCorrect) {
        dispatch(setScore(score + 1));
      }
      const answerObject = {
        question: questions[currentNumber].question,
        userAnswer: answer,
        isCorrect: isCorrect,
        correctAnswer: questions[currentNumber].correct_answer,
      };
      dispatch(setUserAnswers([...userAnswers, answerObject]));
    }
  };

  const nextQuestion = () => {
    dispatch(setCurrentNumber(currentNumber + 1));
    if (currentNumber + 1 === TOTAL_QUESTIONS) {
      dispatch(setGameOver(true));
    } else {
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>

        {console.log(`This is the state: ${state} `)}

        {isGameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}

        {!isGameOver ? <p className="score">Score: {score}</p> : null}
        {isLoading ? <p>Loading questions...</p> : null}
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
