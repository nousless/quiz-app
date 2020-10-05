import React from "react";
import { Answer } from "../App";
import { Wrapper } from "./QuestionCard.Styles";

type Props = {
  question: string;
  answers: string[];
  callback: (answer: string) => void;
  userAnswer?: Answer;
  questionNum: number;
  totalQuestions: number;
};

const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  return e.currentTarget.value;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) => (
  <Wrapper data-testid="questionCard" >
    <p className="number">
      Question: {questionNum} / {totalQuestions}
    </p>

    <p dangerouslySetInnerHTML={{ __html: question }}></p>
    <div>
      {answers.map((answer) => (
        <div key={answer}>
          <button
            data-testid="answerButton"
            className="answerButton"
            disabled={!!userAnswer}
            value={answer}
            onClick={(e) => callback(handleClick(e))}
          >
            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
          </button>
        </div>
      ))}
    </div>
  </Wrapper>
);

export default QuestionCard;
