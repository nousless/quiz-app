import { Answer, QuestionState } from '../types'

//ACTION TYPES
export const SET_LOADING = 'SET_LOADING';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_USER_ANSWERS = 'SET_USER_ANSWERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const INCREMENT_CURRENT_NUMBER = 'INCREMENT_CURRENT_NUMBER';
export const SET_GAME_OVER = 'SET_GAME_OVER';
export const START_NEW_GAME = 'START_NEW_GAME' 

// ACTION CREATORS
export function setLoading(isLoading: boolean) {
    return { type: SET_LOADING, payload: isLoading }
}

export function setUserAnswers(answers: Answer[]) {
    return { type: SET_USER_ANSWERS, payload: answers }
}

export function addUserAnswer(answer: Answer) {
    return { type: ADD_USER_ANSWER, payload: answer }
}

export function incrementScore() {
    return { type: INCREMENT_SCORE }
}
//NUMBER of current questions
export function incrementCurrentNumber() {
    return { type: INCREMENT_CURRENT_NUMBER }
}

export function setGameOver(isOver: boolean) {
    return { type: SET_GAME_OVER, payload: isOver }
}

export function startNewGame(newQuestions: QuestionState[]) {
    return { type: START_NEW_GAME, payload: newQuestions }
}


