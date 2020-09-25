import {combineReducers} from 'redux'
import { gameReducer } from './gameReducer';
import {GameStateActionTypes, GameState} from '../types'

export const rootReducer = combineReducers({
    gameReducer,

});