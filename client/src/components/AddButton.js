import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { GrAdd } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import Textarea from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { editList, postList } from "../JS/actions/listAction";

const AddButton = ({ list, listId }) => {
  const [text, setText] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentBoard } = useSelector((state) => state.boardReducer);
  const { lists } = useSelector((state) => state.listReducer);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };
  const handleAddList = () => {
    if (text === "") return;
    const list = {
      name: text,
      boardId: currentBoard._id,
      order: lists.length,
    };
    dispatch(postList(list));
    setText("");
  };
  const handleAddCard = () => {
    if (text === "") return;
    const listCardAdded = lists.find((list) => list._id === listId);
    const card = {
      name: text,
      order: listCardAdded.cards.length,
    };
    dispatch(editList(listId, { cards: [...listCardAdded.cards, card] }));
    setText("");
  };
  const closeButtonHandler = () => {
    setText("");
    setFormOpen(false);
  };
  const handleSubmitCard = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCard();
    }
  };

  const handleSubmitList = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddList();
    }
  };

  const openForm = () => {
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
  };

  const renderAddButton = () => {
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackground = list ? "rgba(0,0,0,.15)" : "inherit";
    return (
      <div
        onClick={openForm}
        style={{
          ...styles.openForButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackground,
          marginLeft: 8,
        }}
      >
        <GrAdd />
        <p style={{ margin: 0, padding: 1 }}>{buttonText}</p>
      </div>
    );
  };

  const renderForm = () => {
    const placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add list" : "Add card";
    return (
      <div style={{ marginLeft: 8 }}>
        <Card
          style={{
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <Textarea
            placeholder={placeholder}
            autoFocus
            onKeyDown={list ? handleSubmitList : handleSubmitCard}
            onBlur={closeForm}
            value={text}
            onChange={handleInputChange}
            style={{
              resize: "none",
              border: "none",
              outline: "none",
              width: "100%",
            }}
          />
        </Card>
        <div style={{ ...styles.formButtonGroup }}>
          <Button
            variant="success"
            onMouseDown={list ? handleAddList : handleAddCard}
          >
            {buttonTitle}
          </Button>
          <AiOutlineClose
            onMouseDown={closeButtonHandler}
            style={{ marginLeft: "8", cursor: "pointer" }}
          />
        </div>
      </div>
    );
  };
  return formOpen ? renderForm() : renderAddButton();
};
const styles = {
  openForButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
  formButtonGroup: {
    marginTop: "8",
    display: "flex",
    alignItems: "center",
  },
};

export default AddButton;
