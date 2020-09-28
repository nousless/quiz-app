import { SET_CURRENT_NUMBER, SET_GAME_OVER, SET_LOADING, SET_QUESTIONS, SET_SCORE, SET_USER_ANSWERS } from '../actions'
import { GameStateActionTypes, GameState } from '../types'

const initialGameState: GameState = {
    loading: false,
    questions: [],
    userAnswers: [],
    score: 0,
    currentNumber: 0,
    gameOver: true,
}

export function gameReducer(state = initialGameState, action: GameStateActionTypes): GameState {
    switch (action.type) {
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case SET_QUESTIONS: {
            return {
                ...state,
                questions: action.payload
            }
        }
        case SET_USER_ANSWERS: {
            return {
                ...state,
                userAnswers: action.payload
            }
        }
        case SET_SCORE: {
            return {
                ...state,
                score: action.payload
            }
        }
        case SET_CURRENT_NUMBER: {
            return {
                ...state,
                currentNumber: action.payload
            }
        }
        case SET_GAME_OVER: {
            return {
                ...state,
                gameOver: action.payload
            }
        }
        default:
            return state
    }
}

