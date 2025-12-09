import express from 'express';
import SudokuGenerator from './utils/SudokuGenerator.js';
import { generateRandomName } from './utils/wordList.js';
import * as GameModel from './db/model/game.model.js';
import * as UserModel from './db/model/user.model.js';

const router = express.Router();

// 1. GET /api/sudoku - 获取所有游戏
router.get('/', async (req, res) => {
    try {
        const games = await GameModel.getAllGames();
        res.json(games);
    } catch (e) {
        res.status(500).send("Error fetching games");
    }
});

// 2. POST /api/sudoku - 创建游戏
router.post('/', async (req, res) => {
    const { difficulty } = req.body;
    const username = req.username; 

    if (!username) {
        return res.status(401).send("You must be logged in to create a game.");
    }

    let size = 9;
    let cellsToKeep = 30; 

    if (difficulty === 'easy') {
        size = 6;
        cellsToKeep = 18;
    }

    const generator = new SudokuGenerator(size);
    const { puzzle, solution } = generator.generate(cellsToKeep);
    const title = generateRandomName();

    try {
        const newGame = await GameModel.createGame({
            title: title,
            puzzle: puzzle,
            solution: solution,
            difficulty: difficulty || 'normal',
            creator: username,
            completedBy: []
        });
        res.json({ gameId: newGame._id });
    } catch (e) {
        console.error(e);
        res.status(500).send("Error creating game");
    }
});

// 3. GET /api/sudoku/:id - 获取游戏详情
router.get('/:id', async (req, res) => {
    try {
        const game = await GameModel.getGameById(req.params.id);
        if (!game) return res.status(404).send("Game not found");
        res.json(game);
    } catch (e) {
        res.status(500).send("Error fetching game");
    }
});

// 4. POST /api/sudoku/:id/win - 记录胜利
router.post('/:id/win', async (req, res) => {
    const gameId = req.params.id;
    const username = req.username;

    if (!username) {
        return res.status(401).send("You must be logged in to record a win.");
    }

    try {
        await GameModel.completeGame(gameId, username);
        const user = await UserModel.findUserByUsername(username);
        if (user) {
            user.wins += 1;
            await user.save();
        }
        res.send("Score updated");
    } catch (e) {
        res.status(500).send("Error updating score");
    }
});

// 5. DELETE /api/sudoku/:id - 删除游戏 (Feature: Delete Game)
router.delete('/:id', async (req, res) => {
    const gameId = req.params.id;
    const username = req.username; // 当前操作者

    if (!username) return res.status(401).send("Must be logged in");

    try {
        const game = await GameModel.getGameById(gameId);
        if (!game) return res.status(404).send("Game not found");

        if (game.creator !== username) {
            return res.status(403).send("You are not the creator of this game");
        }

        // 关键逻辑：更新所有完成该游戏的用户的胜场数 (win - 1)
        if (game.completedBy && game.completedBy.length > 0) {
            await UserModel.default.updateMany(
                { username: { $in: game.completedBy } },
                { $inc: { wins: -1 } }
            );
        }

        // 物理删除游戏
        await GameModel.default.findByIdAndDelete(gameId);

        res.send("Game deleted successfully");
    } catch (e) {
        console.error("Delete error:", e);
        res.status(500).send("Error deleting game");
    }
});

export default router;