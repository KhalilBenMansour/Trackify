const List = require("../models/list");
const Board = require("../models/board");
const Card = require("../models/card");

// create new list by boardId for a user
const createList = async (req, res) => {
  const boardId = req.body.boardId;

  try {
    const board = await Board.findOne({ _id: boardId, userId: req.user });

    if (!board) {
      return res.status(404).json({
        success: false,
        msg: "there is no board with this boardId for this user",
      });
    }
    const newList = await new List(req.body);

    const listRes = await newList.save();

    res.status(201).send(listRes);
  } catch (error) {
    res.status(400).json({ msg: "list add failed", error });
  }
};

// get list by id
const getListById = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findById(id);
    if (!list) {
      return res.status(404).json({ success: false, msg: "list Not Found" });
    }
    res.status(200).json({ success: true, list });
  } catch (error) {
    res.status(400).json({ msg: "failed to fetch list", error });
  }
};

// get cards by listId
const getCardsOfList = async (req, res) => {
  const { id } = req.params;
  try {
    const list = await List.findOne({ listId: id });
    if (!list) {
      return res.status(404).json({ success: false, msg: "list Not Found" });
    }

    res.status(200).send(list.cards);
  } catch (error) {
    res.status(400).json({ msg: "failed to get lists", error });
  }
};

// update list by id
const updateList = async (req, res) => {
  const _id = req.params.id;

  try {
    const list = await List.findByIdAndUpdate(
      { _id },
      { $set: { ...req.body } },
      { new: true }
    );
    if (!list)
      return res.status(404).json({ success: false, msg: "list Not Found" });
    res
      .status(200)
      .json({ success: true, msg: " list has been updated", list });
  } catch (error) {
    res.status(400).json({ msg: "failed to update list", error });
  }
};

// delete list and card on list
const deleteList = async (req, res) => {
  const _id = req.params.id;
  try {
    const list = await List.findByIdAndDelete(_id);
    if (!list)
      return res.status(404).json({ success: false, msg: "list Not Found" });

    res
      .status(200)
      .json({ success: true, msg: " list has been deleted", list });
  } catch (error) {
    res.status(400).json({ msg: "failed to delete list", error });
  }
};

module.exports = {
  createList,
  getListById,
  getCardsOfList,
  updateList,
  deleteList,
};
