import mongoose from 'mongoose';
import GameSchema from '../schema/game.schema.js';

const GameModel = mongoose.model("Game", GameSchema);

export function createGame(gameData) {
    return GameModel.create(gameData);
}

export function getAllGames() {
    return GameModel.find({}, { solution: 0 }); 
}

export function getGameById(id) {
    return GameModel.findById(id);
}

export function completeGame(gameId, username) {
    return GameModel.findByIdAndUpdate(
        gameId, 
        { $addToSet: { completedBy: username } },
        { new: true }
    );
}

export default GameModel;