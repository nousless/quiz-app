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
    
    beforeEach(() => {
        fetchMock.resetMocks()
      })

    const testAmount = 1;
    const testDifficulty = Difficulty.Easy;

    it("should return the same result everytime", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
              result: [
                { category: "Entertainment: Video Games" },
                { type: "multiple" },
                { difficulty: "easy" },
                { incorrect_answers: ["Mario", "Zelda", "Pit"] },
                {
                  question:
                    "What is the name of the main protagonist in Legend of Zelda",
                },
                { correct_answer: "Link" },
              ],
            })
          );
      fetchQuizQuestions(testAmount, testDifficulty).then(res => {
        console.log(res)
        expect(res).toEqual('12345')
      })
      
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
