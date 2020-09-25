import React, { useState } from "react";
import { useTheme } from "styled-components";
import { fetchQuizQuestions } from "./API";
import {store} from './redux/store'

//Styles
import {GlobalStyle, Wrapper} from './App.styles'
//Components
import QuestionCard from "./components/QuestionCard";
//Types
import { Difficulty, QuestionState } from "./API";

export type AnswerObject = {
  question: string;
  userAnswer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.Easy
    );
    //Cia galetu but reset game actionas
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setCurrentNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      e.preventDefault();
      //user answer
      const answer = e.currentTarget.value;
      const isCorrect = questions[currentNumber].correct_answer === answer;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[currentNumber].question,
        userAnswer: answer,
        isCorrect: isCorrect,
        correctAnswer: questions[currentNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    setCurrentNumber(currentNumber + 1);
    console.log(store.getState())
    if (currentNumber + 1 === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>REACT QUIZ</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>
          Start
        </button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading questions...</p> : null}
      {!loading && !gameOver ? (
        <QuestionCard
          questionNum={currentNumber + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[currentNumber].question}
          answers={questions[currentNumber].answers}
          userAnswer={userAnswers ? userAnswers[currentNumber] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!gameOver &&
      !loading &&
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
