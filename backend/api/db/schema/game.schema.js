import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    puzzle: {
        type: [[Number]], 
        required: true
    },
    solution: {
        type: [[Number]],
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'normal'],
        default: 'normal'
    },
    creator: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completedBy: [{
        type: String
    }]
}, { collection: 'games' });

export default GameSchema;