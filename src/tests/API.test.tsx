import fetch from "jest-fetch-mock";
import { fetchQuizQuestions, Difficulty, Questions } from "../API";
describe("API", () => {
  const testAmount = 2;
  const testDifficulty = Difficulty.Easy;

  beforeEach(() => {
    fetch.resetMocks();
  });
  //Bandziau mockint, kaip reiktu, bet API vistiek kaskart duoda skirtinga response
  //tai pasidaviau ir padariau prasciau
  it("fetches successfully", async () => {
    const desiredResult = fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            answers: ["Mars", "Ares", "Jupiter", "Juno"],
            category: "Mythology",
            correct_answer: "Mars",
            difficulty: "easy",
            incorrect_answers: ["Jupiter", "Juno", "Ares"],
            question:
              "The ancient Roman god of war was commonly known as which of the following?",
            type: "multiple",
          },
          {
            answers: [
              "Town of Salem",
              "Undertale",
              "Tower Unite",
              "Enter the Gungeon",
            ],
            category: "Entertainment: Video Games",
            correct_answer: "Enter the Gungeon",
            difficulty: "easy",
            incorrect_answers: ["Town of Salem", "Undertale", "Tower Unite"],
            question: "Which game did NOT get financed via Crowdfunding?",
            type: "multiple",
          },
        ],
      })
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
