const Board = require("../models/board");
const Card = require("../models/card");
const List = require("../models/list");
const Notification = require("../models/notification");

// create a new board for a user
const createBoard = async (req, res) => {
  const newBoard = new Board(req.body);
  try {
    const boardRes = await newBoard.save();
    res.status(201).send(boardRes);
  } catch (error) {
    res.status(400).json({ msg: "board add failed", error });
  }
};

//get all the boards for a user
const getBoards = async (req, res) => {
  try {
    const boardList = await Board.find({ userId: req.user }).populate(
      "userId",
      "username"
    );
    res.status(200).send(boardList);
  } catch (error) {
    res.status(404).json({ msg: "failed to fetch BoardList", error });
  }
};

// get one board by id for a user
const getBoard = async (req, res) => {
  const { id } = req.params;
  try {
    const board = await Board.findOne({ _id: id, userId: req.user });
    if (!board) {
      return res.status(404).json({ succes: false, msg: "board not found" });
    }

    res.status(200).send(board);
  } catch (error) {
    res.status(400).json({ msg: "failed to fetch Board", error });
  }
};

//get lists by boardId  for a user
const getlistsOfBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findOne({ _id: id, userId: req.user });
    if (!board) {
      return res.status(404).json({ success: false, msg: "Board Not Found" });
    }
    const lists = await List.find({ boardId: id }).sort({ order: 1 });
    res.status(200).send(lists);
  } catch (error) {
    res.status(400).json({ msg: "failed to get lists", error });
  }
};

// get cards by boardId for a user
const getCardsOfBoard = async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findOne({ _id: id, userId: req.user });
    if (!board) {
      return res.status(404).json({ success: false, msg: "Board Not Found" });
    }
    const cards = await Card.find({ boardId: id });
    res.status(200).send(cards);
  } catch (error) {
    res.status(400).json({ msg: "failed to get cards", error });
  }
};

// update board by boardId for a user
const updateBoard = async (req, res) => {
  const _id = req.params.id;

  try {
    const board = await Board.findOneAndUpdate(
      { _id, userId: req.user },
      { $set: { ...req.body } },
      { new: true }
    );

    if (!board)
      return res.status(404).json({ success: false, msg: "board Not Found" });
    res
      .status(200)
      .json({ success: true, msg: " board has been updated", board });
  } catch (error) {
    res.status(400).json({ msg: "failed to update board", error });
  }
};

// get notification by boardID
const getNotifications = async (req, res) => {
  const _id = req.params.id;
  try {
    const board = await Board.findOne({ _id, userId: req.user });
    if (!board) return res.status(404).json({ msg: "board not found" });

    const notifications = await Notification.find({ boardId: _id })
      .limit(2)
      .sort({ createdAt: "desc" });
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(400).json({ success: false, msg: "can't get notifications" });
  }
};

// delete board and content of board
const deleteBoard = async (req, res) => {
  const _id = req.params.id;
  try {
    const board = await Board.findOneAndDelete({ _id, userId: req.user });
    if (!board)
      return res.status(404).json({ success: false, msg: "board Not Found" });

    await List.deleteMany({ boardId: _id });

    await Notification.deleteMany({ boardId: _id });

    res
      .status(200)
      .json({ success: true, msg: " board has been deleted", board });
  } catch (error) {
    res.status(400).json({ msg: "failed to delete board", error });
  }
};

module.exports = {
  createBoard,
  getBoards,
  getBoard,
  getlistsOfBoard,
  getCardsOfBoard,
  updateBoard,
  getNotifications,
  deleteBoard,
};
