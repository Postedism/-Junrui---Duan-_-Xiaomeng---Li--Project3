import mongoose from 'mongoose';
import UserSchema from '../schema/user.schema.js';

const UserModel = mongoose.model("User", UserSchema);


export function createUser(user) {
    return UserModel.create(user);
}

export function findUserByUsername(username) {
    return UserModel.findOne({ username });
}

export function getAllUsers() {
    return UserModel.find().sort({ wins: -1 }); 
}

export default UserModel;