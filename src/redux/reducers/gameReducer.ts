import { SET_CURRENT_NUMBER, SET_LOADING, SET_QUESTIONS, SET_SCORE, SET_USER_ANSWERS } from '../actions'
import {GameStateActionTypes, GameState} from '../types'

const initialGameState: GameState ={
    loading:false,
    questions: [],
    userAnswers: [],
    score: 0,
    currentNumber: 0,
    gameOver: true,
}

export function gameReducer(state = initialGameState, action: GameStateActionTypes):GameState{
    switch(action.type){
        case SET_LOADING:{
            return{
                ...initialGameState,
                loading: action.payload
            } 
        }
        case SET_QUESTIONS:{
            return{
                ...initialGameState,
                questions: action.payload
            }
        }
        case SET_USER_ANSWERS:{
            return{
                ...initialGameState,
                userAnswers: action.payload
            }
        }
        case SET_SCORE:{
            return{
                ...initialGameState,
                score: action.payload
            }
        }
        case SET_CURRENT_NUMBER:{
            return{
                ...initialGameState,
                currentNumber: action.payload
            }
        }
        default:
            return state
    }
}

