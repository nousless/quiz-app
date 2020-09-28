import {combineReducers} from 'redux'
import { GameState } from '../types';
import { gameReducer } from './gameReducer';

export interface AppState  {
    game:GameState;
}

export const rootReducer = combineReducers({
    game:gameReducer,

});