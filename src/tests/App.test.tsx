import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock"
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import App from "../App";
import QuestionCard from "../components/QuestionCard";
import { Difficulty } from "../redux/types";
import { fetchQuizQuestions } from "../API";
import {RESULTS} from './constants.ts'

describe("App", () => {
  let wrapper: HTMLElement;

  // before each test, set initial store state
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    ).baseElement;
  });

  describe("API", () => {
    const testAmount = 2;
    const testDifficulty = Difficulty.Easy;
  
    beforeEach(() => {
      fetch.resetMocks();
    });
    
    it("fetches successfully", async () => {
      const desiredResult = fetch.mockResponseOnce(
        JSON.stringify(RESULTS)
      );
  
      const result = await fetchQuizQuestions(testAmount, testDifficulty);
      //Galima butu matchint ir tiksliau, bet tiesiog norim patikrint ar grazina
      expect(result).toBeTruthy();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://opentdb.com/api.php?amount=${testAmount}&difficulty=${testDifficulty}&type=multiple`
      );
    });
  });
  

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
  });
});
//Render the entirety of the initial gameState
//StartButton, H1
//On StartButtonClick, the questions should be fetched
//when they are, we check if we get the expected data/result
//render the question card with fetched data
//QuestionCard
