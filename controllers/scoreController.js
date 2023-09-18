const Score = require("../models/Score");
const User = require("../models/User");

async function addScore(req, res) {
  try {
    const { email, nickname, score, date } = req.body;
    const user = await User.findOne({ $or: [{ email }, { nickname }] });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const newScore = await Score.create({
      userId: user._id,
      nickname: nickname,
      score: score,
      date: date,
    });

    res.status(201).send(newScore);
  } catch (error) {
    console.error("Error adding score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllScores(req, res) {
  try {
    const scores = await Score.find({});
    if (scores.length === 0) {
      return res.status(400).send(`You currently don't have any scores!`);
    }
    res.status(201).send(scores);
  } catch (error) {
    console.error("Error getting all scores:", error);
    res.status(500).send({ error: "Internal server error" });
  }
}
async function getUsersHistoryScores(req, res) {
  try {
    const userId = req.params.id;
    const scores = await Score.find({ userId });
    if (scores.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(201).send(scores);
  } catch (error) {
    console.error(`Error getting user's scores`, error);
    res.status(500).send("Internal server error");
  }
}
async function getLastScore(req, res) {
  try {
    const userId = req.params.id;
    const lastScore = await Score.findOne({ userId }).sort({ date: -1 });
    res.status(201).send(lastScore);
  } catch (error) {
    console.log(`Error getting latest user's score `, error);
    res.status(500).send("Internal server error");
  }
}
async function getHighestScore(req, res) {
  try {
    const userId = req.params.id;
    const highestScore = await Score.findOne({ userId }).sort({ score: -1 });
    res.status(201).send(highestScore);
  } catch (error) {
    console.log(`Error getting latest user's score `, error);
    res.status(500).send("Internal server error");
  }
}

module.exports = {
  addScore,
  getAllScores,
  getUsersHistoryScores,
  getLastScore,
  getHighestScore,
};
