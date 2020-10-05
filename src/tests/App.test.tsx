import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import App from "../App";
import { RESULTS } from "./stubs";
import { createStore } from "redux";
import { rootReducer } from "../redux/reducers";
import { Difficulty, fetchQuizQuestions } from "../API";

describe("App", () => {


  // test("sucessful game flow", async () => {
  //   render(
  //     <Provider store={store}>
  //       <App />
  //     </Provider>
  //   );
  //   fetch.mockResponseOnce(JSON.stringify(RESULTS));

  //   const startButton = screen.getByText("Start");

  //   //Fetch test
  //   expect(startButton).toBeVisible();
  //   fireEvent.click(startButton);
  //   expect(fetch).toHaveBeenCalledTimes(1);

  //   //Loading state
  //   expect(screen.getByText("Loading...")).toBeVisible();
  //   expect(screen.getByText(/Score:/i)).toBeVisible();

  //   //Loaded state
  //   await waitFor(() => screen.getByTestId("questionCard"));
  //   expect(screen.getByTestId("questionCard")).toBeVisible();
  // });



  test("question card use", async () => {
    
    fetch.mockResponseOnce(JSON.stringify(RESULTS));
    const result = await fetchQuizQuestions(2, Difficulty.Easy);
    const newStore = createStore(
      rootReducer,
      {
        game: {
          loading: false,
          questions: result,
          userAnswers: [],
          score: 0,
          currentNumber: 0,
          gameOver: false,
        },
      },
      undefined
    );

    render(
      <Provider store={newStore}>
        <App />
      </Provider>
    );

    //Selecting the correct answer
    fireEvent.click(screen.getByText(/Mars/i));
    expect(screen.getByTestId("nextQuestion")).toBeVisible();

    //Check score increase
    const scoreDisplay = screen.getByText(/Score/i);
    expect(scoreDisplay.innerHTML).toEqual("Score: 1");

    //Go to next question
    fireEvent.click(screen.getByTestId("nextQuestion"));
    expect(screen.getByText(/Undertale/i)).toBeVisible();

    //Select wrong answer (and reach the end of the available questions)
    fireEvent.click(screen.getByText(/Undertale/i));
    expect(scoreDisplay.innerHTML).toEqual("Score: 1");
    expect(screen.getByText(/Start/i)).toBeVisible();
  });
});
