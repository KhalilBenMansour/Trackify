import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { editList } from "../JS/actions/listAction";

const Cart = ({ name, id, index, listId }) => {
  const [editable, setEditable] = useState(false);
  const [cardTitle, setCardTitle] = useState(name);
  const [showDelete, setShowDelete] = useState(false);

  const { lists } = useSelector((state) => state.listReducer);
  const dispatch = useDispatch();

  const listOfDeletedCard = (id) => {
    const list = lists.find((list) => list._id === listId);
    const cardIndex = list.cards.findIndex((card) => card._id === id);
    list.cards.splice(cardIndex, 1);
    return list;
  };

  const handleEditCard = () => {
    setEditable(false);
    const text = cardTitle.trim();
    if (text === "") {
      setCardTitle(name);
      return;
    }
    setCardTitle(text);
    const list = lists.find((list) => list._id === listId);
    const cardIndex = list.cards.findIndex((card) => card._id === id);
    list.cards[cardIndex].name = text;
    dispatch(editList(listId, list));
    name = text;
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          style={{ marginBottom: 7 }}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Card>
            <Card.Body>
              {editable ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditCard();
                  }}
                >
                  <input
                    className="form-control "
                    type="text"
                    onChange={(e) => {
                      setCardTitle(e.target.value);
                    }}
                    autoFocus
                    value={cardTitle}
                    style={{
                      resize: "none",
                      border: "none",
                      outline: "none",
                      width: "100%",
                    }}
                    onBlur={handleEditCard}
                  />
                </form>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onClick={() => setEditable(true)}
                  onMouseEnter={() => setShowDelete(true)}
                  onMouseLeave={() => setShowDelete(false)}
                >
                  <h6>{name}</h6>
                  {showDelete && (
                    <BsTrash
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(editList(listId, listOfDeletedCard(id)))
                      }
                    />
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Cart;
