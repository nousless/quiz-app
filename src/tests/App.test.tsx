import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import fetch from "jest-fetch-mock";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import App from "../App";
import { RESULTS } from "./stubs";

describe("App", () => {
  // before each test, set initial store state
  const init = () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  test("sucessful game flow", async () => {
    init();
    fetch.mockResponseOnce(JSON.stringify(RESULTS));

    const startButton = screen.getByText("Start");

    //Fetch test
    expect(startButton).toBeVisible();
    fireEvent.click(startButton);
    expect(fetch).toHaveBeenCalledTimes(1);

    //Loading state
    expect(screen.getByText("Loading...")).toBeVisible();
    expect(screen.getByText(/Score:/i)).toBeVisible();

    //Loaded state
    await waitFor(() => screen.getByTestId("questionCard"));
    expect(screen.getByTestId("questionCard")).toBeVisible();

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
    expect(startButton).toBeVisible();

  });
});

//Render the entirety of the initial gameState
//StartButton, H1
//On StartButtonClick, the questions should be fetched
//when they are, we check if we get the expected data/result
//render the question card with fetched data
//QuestionCard
