import "@testing-library/jest-dom";
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QuestionCard from "../components/QuestionCard";
import { Provider } from "react-redux";
import { store } from "../redux/store";

describe("QuestionCard", () => {
  const testQuestion = `This is a bucket`;
  const testAnswers = [
    "Dear god!",
    `There's more!`,
    "NO!",
    "We have 48 hours to live",
  ];
  const testCallback = jest.fn();

  const testQuestionNum = 4;
  const testTotalQuestions = 10;
  // before each test, set initial store state
  beforeEach(() => {
    render(
      <QuestionCard
        question={testQuestion}
        answers={testAnswers}
        callback={testCallback}
        questionNum={testQuestionNum}
        totalQuestions={testTotalQuestions}
      />
    );
  });

  it("should log out the value of the clicked button", () => {

    fireEvent.click(screen.getByText(/There/i));
    expect(testCallback).toHaveBeenCalledWith(`There's more!`);
  });

  it("should display props where appropriate", () => {

    
    expect(screen.getByText(testQuestion)).toBeTruthy();
    expect(screen.getByText(testAnswers[0])).toBeTruthy();

  });
});
//redux store
//API call (fetchMock)
