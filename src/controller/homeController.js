import { users, leaderboard, quest } from "../model/index";

const User = users;

const Leaderboard = leaderboard;

const Quest = quest;

function getUser(email) {
  User.find({ email })
    .then(data => (data[0]) )
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

export function index(_, res) {
  res.json({
    status: true,
    message: "API service for K-Link, made with 💕 and 🏆",
    another_message: `Guess what?! This route is just the index for welcoming you, Dear Visitor.`
  })
}

export function create(req, res) {
  if (!req.body.username) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.email) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (!req.body.password) {
    return res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  // Save User in the database
  user
    .save(user)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
}

export function login(req, res) {
  const email = req.body.email;
  const password = req.body.password

  if (!email)
    return res.status(400).json({
      message: 'Email is required',
      status: false
    })

  if (!password)
    return res.status(400).json({
      message: 'Password is required',
      status: false
    })

  User.find({ email, password })
    .then(data => {
      if (!data.length)
        return res.status(400).json({
          message: 'Wrong username or password',
          status: false
        })

      return res.json({ data, status: true });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

export function getUserData(req, res) {
  const email = req.body.email

  User.find({ email })
    .then(data => {
      return res.json({ data, status: true });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

export function createQuest(req, res) {
  const quest = new Quest({
    action: req.body.action,
    percentage: req.body.percentage,
    reward: req.body.reward
  });

  // Save User in the database
  quest
    .save(quest)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
}

export function getLeaderboard(_, res) {
  User.find()
  .sort({ points: -1 })
  .limit(10)
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

export async function updateLeaderBoard(req, res) {

  let { username, score } = req.body;

  let update = await User.findOneAndUpdate(username, { score },
    { new: true }
  )

  return res.send(update);
}

export function getQuests(_, res) {
  Quest.find()
  .then(data => res.send(data))
  .catch(err => {
    return res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

export function upadatePoint(req, res) {
  let { username, score } = req.body

  User.findOneAndUpdate({ username }, { score },
    { new: true }
  )
  .then(result => {
    return res.send(result);
  })
}