import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  editBoard,
  fetchBoardById,
  fetchListsFromBoard,
} from "../JS/actions/boardAction";
import AddButton from "./AddButton";
import List from "./List";
import { editList } from "../JS/actions/listAction";
import Loader from "./Loader";

const Board = () => {
  const { id } = useParams();

  const { listLoading, lists } = useSelector((state) => state.listReducer);
  const { currentBoard } = useSelector((state) => state.boardReducer);

  const [editable, setEditable] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoardById(id));
    dispatch(fetchListsFromBoard(id));
  }, [id, dispatch]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    const draggingList = lists.find((list) => list._id === draggableId);
    if (type === "list") {
      lists.splice(source.index, 1);
      lists.splice(destination.index, 0, draggingList);

      const prevList = lists.find((list) => list.order === source.index);
      const nextList = lists.find((list) => list.order === destination.index);
      dispatch(editList(prevList._id, { order: destination.index }));
      dispatch(editList(nextList._id, { order: source.index }));

      return;
    }
    const sourceList = lists.find((list) => list._id === source.droppableId);
    const destinationList = lists.find(
      (list) => list._id === destination.droppableId
    );
    const draggingCard = sourceList.cards.find(
      (card) => card._id === draggableId
    );
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      dispatch(editList(sourceList._id, destinationList));
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      dispatch(editList(sourceList._id, sourceList));
      dispatch(editList(destinationList._id, destinationList));
    }
  };
  const handleEditBoard = () => {
    const text = boardTitle.trim();
    if (text === "") {
      setBoardTitle(currentBoard.name);
      return;
    }
    setEditable(false);
    dispatch(editBoard(id, { name: text }));
    currentBoard.name = boardTitle;
  };

  return listLoading ? (
    <Loader />
  ) : (
    <>
      <div className="pt-5">
        {editable ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditBoard();
            }}
          >
            <input
              className="form-control w-25 "
              type="text"
              autoFocus
              value={boardTitle}
              onChange={(e) => {
                e.preventDefault();
                setBoardTitle(e.target.value);
              }}
              onBlur={handleEditBoard}
            />
          </form>
        ) : (
          <div onClick={() => setEditable(true)} style={{ marginLeft: 8 }}>
            <h2>{currentBoard.name}</h2>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" type="list" direction="horizontal">
          {(provided) => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => {
                return (
                  <List
                    key={list._id}
                    name={list.name}
                    id={list._id}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
              <AddButton list />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
