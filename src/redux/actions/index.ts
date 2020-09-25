import { AnswerObject, QuestionState } from '../types'

//ACTION TYPES
export const SET_LOADING = 'SET_LOADING';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const SET_USER_ANSWERS = 'SET_USER_ANSWERS';
export const SET_SCORE = 'SET_SCORE';
export const SET_CURRENT_NUMBER = 'SET_CURRENT_NUMBER';

// ACTION CREATORS
export function setLoading(isLoading: boolean) {
    return { type: SET_LOADING, payload: isLoading }
}

export function setQuestions(questions: QuestionState[]) {
    return { type: SET_QUESTIONS, payload: questions }
}

export function setUserAnswers(answers: AnswerObject[]) {
    return { type: SET_USER_ANSWERS, payload: answers }
}

export function setScore(score: number) {
    return { type: SET_SCORE, payload: score }
}
//NUMBER of current questions
export function setCurrentNumber(num: number) {
    return { type: SET_CURRENT_NUMBER, payload: num }
}


//fetch -> siunti actiona (settini isLoading = true), 