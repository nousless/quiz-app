

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import fetch from "jest-fetch-mock";
import React from "react";
import { Provider} from "react-redux";
import { store } from "../redux/store";
import App from "../App";
import { RESULTS } from "./stubs";



describe("App", () => {

  // before each test, set initial store state
  beforeEach(() => {
  
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  
  
  test("sucessful game start flow", () => {
    //test startQuiz
    fetch.mockResponseOnce(JSON.stringify(RESULTS));
    let game = store.getState().game;

    const startButton = screen.getByText("Start");
    expect(startButton).toBeVisible();
   
    
    fireEvent.click(startButton);
    game = store.getState().game;
    expect(game.gameOver).toEqual(false);
    expect(game.loading).toEqual(true);
  });
});

//Render the entirety of the initial gameState
//StartButton, H1
//On StartButtonClick, the questions should be fetched
//when they are, we check if we get the expected data/result
//render the question card with fetched data
//QuestionCard
