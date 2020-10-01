import { ADD_USER_ANSWER, INCREMENT_CURRENT_NUMBER, SET_GAME_OVER, SET_LOADING, INCREMENT_SCORE, SET_USER_ANSWERS, START_NEW_GAME } from '../actions'
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
        case SET_USER_ANSWERS: {
            return {
                ...state,
                userAnswers: action.payload
            }
        }
        case ADD_USER_ANSWER:{
            return{
                ...state,
                userAnswers: [...state.userAnswers, action.payload]
            }
        }
        case INCREMENT_SCORE: {
            return {
                ...state,
                score: state.score +1
            }
        }
        case INCREMENT_CURRENT_NUMBER: {
            return {
                ...state,
                currentNumber: state.currentNumber + 1
            }
        }
        case SET_GAME_OVER: {
            return {
                ...state,
                gameOver: action.payload
            }
        }
        case START_NEW_GAME: {
            return{
                ...state,
                questions: action.payload,
                score: 0,
                userAnswers: [],
                currentNumber: 0,
            }
        }
        default:
            return state
    }
}

