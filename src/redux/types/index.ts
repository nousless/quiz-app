import {
    SET_LOADING,
    SET_USER_ANSWERS,
    INCREMENT_SCORE,
    INCREMENT_CURRENT_NUMBER,
    SET_GAME_OVER, ADD_USER_ANSWER, START_NEW_GAME
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

export interface setUserAnswers {
    type: typeof SET_USER_ANSWERS,
    payload: AnswerObject[],
}
export interface addUserAnswer{
    type: typeof ADD_USER_ANSWER,
    payload: AnswerObject
}

export interface incrementScore {
    type: typeof INCREMENT_SCORE,
    payload: null,
}

export interface incrementCurrentNumber {
    type: typeof INCREMENT_CURRENT_NUMBER,
    payload: number,
}

export interface setGameOver {
    type: typeof SET_GAME_OVER,
    payload: boolean,
}

export interface startNewGame {
    type: typeof START_NEW_GAME,
    payload: QuestionState[],
}



export type QuestionState = Question & { answers: string[] };
export type GameStateActionTypes = 
setLoading | setUserAnswers | addUserAnswer | incrementScore | 
incrementCurrentNumber | setGameOver | startNewGame;