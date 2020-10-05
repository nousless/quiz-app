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
    }

  test("sucessful game start flow", async () => {
    init()
    fetch.mockResponseOnce(JSON.stringify(RESULTS));


    const startButton = screen.getByText("Start");
   
    expect(startButton).toBeVisible();
    fireEvent.click(startButton);
    expect(fetch).toHaveBeenCalledTimes(1);
   
   
    expect(screen.getByText("Loading...")).toBeVisible();
    expect(screen.getByText(/Score:/i)).toBeVisible();
    
    await waitFor(() => screen.getByTestId('questionCard'))


  });
});

//Render the entirety of the initial gameState
//StartButton, H1
//On StartButtonClick, the questions should be fetched
//when they are, we check if we get the expected data/result
//render the question card with fetched data
//QuestionCard
