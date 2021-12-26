import { useDispatch, useSelector } from "react-redux";
import AddButton from "./AddButton";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BsTrashFill } from "react-icons/bs";
import Cart from "./Cart";
import { useState } from "react";
import { editList, removeList } from "../JS/actions/listAction";

const List = ({ name, id, index }) => {
  const [editable, setEditable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [listTitle, setListTitle] = useState(name);

  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.listReducer);
  const list = lists.find((list) => list._id === id);
  const cards = list.cards;

  const handleEditList = () => {
    setEditable(false);
    dispatch(editList(id, { name: listTitle }));
    name = listTitle;
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                style={{
                  backgroundColor: "#dfe3e6",
                  borderRadius: 3,
                  width: "300px",
                  // height: "100%",
                  padding: 8,
                  marginLeft: 8,
                  marginBottom: 8,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {editable ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEditList();
                    }}
                  >
                    <input
                      className="form-control"
                      type="text"
                      autoFocus
                      value={listTitle}
                      onChange={(e) => setListTitle(e.target.value)}
                      onBlur={handleEditList}
                    />
                  </form>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginLeft: 8,
                      height: "100%",
                    }}
                    onClick={() => setEditable(true)}
                    onMouseEnter={() => setShowDelete(true)}
                    onMouseLeave={() => setShowDelete(false)}
                  >
                    <h4>{name}</h4>
                    {showDelete && (
                      <BsTrashFill
                        style={{ cursor: "pointer" }}
                        onClick={() => dispatch(removeList(id))}
                      />
                    )}
                  </div>
                )}

                {cards.map((card, index) => (
                  <Cart
                    key={card._id}
                    name={card.name}
                    index={index}
                    id={card._id}
                    listId={id}
                  />
                ))}
                {provided.placeholder}
                <AddButton listId={id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
