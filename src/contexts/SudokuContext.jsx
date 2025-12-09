import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { findNakedSingle } from '../utils/validation';

// 检查是否胜利
function checkWin(board, solution) {
  if (!board || !solution || board.length === 0) return false;
  return JSON.stringify(board) === JSON.stringify(solution);
}

const initialState = {
  gameId: null,
  title: '',
  creator: null,
  gameMode: 'normal',
  initialBoard: [],       // 题目 (不可变)
  solutionBoard: [],      // 答案
  currentBoardState: [],  // 当前用户填写的状态
  selectedCell: null,
  hintCell: null,
  timer: 0,
  isWon: false,
  isLoading: false,
  error: null
};

function sudokuReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true, error: null };
    
    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload };

    case 'GAME_LOADED': {
      const { _id, title, puzzle, solution, difficulty, creator } = action.payload;
      return {
        ...initialState,
        gameId: _id,
        title: title,
        creator: creator,
        gameMode: difficulty,
        initialBoard: puzzle,
        solutionBoard: solution,
        // 深拷贝一份作为当前棋盘
        currentBoardState: puzzle.map(row => [...row]), 
        isLoading: false,
      };
    }

    case 'SELECT_CELL':
      return { ...state, selectedCell: action.payload, hintCell: null };

    case 'UPDATE_CELL_VALUE': {
      if (state.isWon) return state;
      const { row, col, value } = action.payload;
      const size = state.gameMode === 'easy' ? 6 : 9;

      // 初始格子不能修改
      if (state.initialBoard[row][col] !== 0) return state;
      if (value < 0 || value > size) return state;

      const newBoardState = state.currentBoardState.map(r => [...r]);
      newBoardState[row][col] = value;
      const isWon = checkWin(newBoardState, state.solutionBoard);

      return {
        ...state,
        currentBoardState: newBoardState,
        isWon: isWon,
        hintCell: null,
      };
    }
    
    case 'FIND_HINT': {
      if (state.isWon) return state;
      const hint = findNakedSingle(state.currentBoardState);
      if (hint) {
        return {
          ...state,
          selectedCell: { row: hint.row, col: hint.col },
          hintCell: { row: hint.row, col: hint.col },
        };
      }
      return state;
    }

    // 🆕 新增：重置游戏逻辑
    case 'RESET_GAME': {
      return {
        ...state,
        // 重新从 initialBoard 深拷贝一份
        currentBoardState: state.initialBoard.map(row => [...row]),
        selectedCell: null,
        hintCell: null,
        isWon: false,
      };
    }
    
    case 'TICK_TIMER':
      if (state.isWon) return state;
      return { ...state, timer: state.timer + 1 };

    default:
      return state;
  }
}

const SudokuStateContext = createContext(undefined);
const SudokuDispatchContext = createContext(undefined);

export function SudokuProvider({ children }) {
  const [state, dispatch] = useReducer(sudokuReducer, initialState);

  // 1. 创建游戏
  const createGame = async (difficulty) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await axios.post('/api/sudoku', { difficulty });
      return res.data.gameId; 
    } catch (error) {
      const errMsg = error.response?.status === 401 ? "Please login first!" : "Error creating game";
      dispatch({ type: 'SET_ERROR', payload: errMsg });
      throw error;
    }
  };

  // 2. 加载游戏
  const loadGame = async (gameId) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const res = await axios.get(`/api/sudoku/${gameId}`);
      dispatch({ type: 'GAME_LOADED', payload: res.data });
    } catch (error) {
      console.error("Failed to load game:", error);
      dispatch({ type: 'SET_ERROR', payload: "Game not found" });
    }
  };

  // 3. 删除游戏
  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`/api/sudoku/${gameId}`);
    } catch (error) {
      console.error("Failed to delete game:", error);
      throw error;
    }
  };

  // 4. 监听胜利
  useEffect(() => {
    if (state.isWon && state.gameId) {
       axios.post(`/api/sudoku/${state.gameId}/win`)
        .catch(err => console.error("Failed to record score:", err));
    }
  }, [state.isWon, state.gameId]);

  return (
    <SudokuStateContext.Provider value={{ state, createGame, loadGame, deleteGame }}>
      <SudokuDispatchContext.Provider value={dispatch}>
        {children}
      </SudokuDispatchContext.Provider>
    </SudokuStateContext.Provider>
  );
}

export function useSudokuState() {
  const context = useContext(SudokuStateContext);
  if (context === undefined) throw new Error('useSudokuState must be used within a SudokuProvider');
  return context;
}

export function useSudokuDispatch() {
  const context = useContext(SudokuDispatchContext);
  if (context === undefined) throw new Error('useSudokuDispatch must be used within a SudokuProvider');
  return context;
}