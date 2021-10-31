import { url } from "../config/config.db";
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export const db = { mongoose, url };

export const users = require("./user.model").default(mongoose);

export const leaderboard = require("./leaderboard.model").default(mongoose);

export const quest = require("./quest.model").default(mongoose);