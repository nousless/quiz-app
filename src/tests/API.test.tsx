import fetch from "jest-fetch-mock";
import { fetchQuizQuestions, Difficulty, Questions } from "../API";
import {RESULTS} from './constants.ts'
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
