import {
    SET_LOADING,
    SET_QUESTIONS,
    SET_USER_ANSWERS,
    SET_SCORE,
    SET_CURRENT_NUMBER,
    SET_GAME_OVER
} from '../actions'


export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
};

export interface AnswerObject {
    question: string;
    userAnswer: string;
    isCorrect: boolean;
    correctAnswer: string;
};

export interface GameState {
    loading: boolean,
    questions: QuestionState[],
    userAnswers: AnswerObject[],
    score: number,
    currentNumber: number,
    gameOver: boolean,
}

export interface Question {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string,
}

//ACTION TYPES

export interface setLoading {
    type: typeof SET_LOADING,
    payload: boolean;
}

export interface setQuestions {
    type: typeof SET_QUESTIONS,
    payload: QuestionState[],
}

export interface setUserAnswers {
    type: typeof SET_USER_ANSWERS,
    payload: AnswerObject[],
}

export interface setScore {
    type: typeof SET_SCORE,
    payload: number,
}

export interface setCurrentNumber {
    type: typeof SET_CURRENT_NUMBER,
    payload: number,
}

export interface setGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean,
}



export type QuestionState = Question & { answers: string[] };
export type GameStateActionTypes = setLoading | setQuestions | setUserAnswers | setScore | setCurrentNumber | setGameOver;