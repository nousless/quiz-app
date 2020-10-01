import { Question } from './redux/types';
import { shuffleArray } from './utils'

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
};
 
export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([
                ...question.incorrectAnswers,
                question.correctAnswer
            ]),
        }
    ))
}