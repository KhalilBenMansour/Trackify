import React, { useEffect, useRef, useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { fetchBoards, postBoard, removeBoard } from "../JS/actions/boardAction";
import Loader from "./Loader";

const Boards = () => {
  const [showDelete, setShowDelete] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { boards, loading } = useSelector((state) => state.boardReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const innerRef = useRef();
  useEffect(() => innerRef.current && innerRef.current.focus());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllBoards = () => {
    dispatch(fetchBoards());
  };

  const handleSubmit = () => {
    if (boardName === "") return handleClose();
    const board = {
      name: boardName,
      userId: user._id,
    };
    dispatch(postBoard(board));
    handleClose();
    setBoardName("");
  };

  useEffect(() => {
    document.title = `Home | Trackify`;
    getAllBoards();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="d-flex flex-wrap justify-content-center pt-5 mt-5">
      {boards.map((board) => (
        <div className="m-2" key={board._id}>
          <Card style={{ width: "17rem", height: "90px", cursor: "pointer" }}>
            <Card.Body>
              <Card.Title>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onMouseEnter={() => setShowDelete(true)}
                  onMouseLeave={() => setShowDelete(false)}
                >
                  <h4 onClick={() => navigate(`/boards/${board._id}`)}>
                    {board.name}
                  </h4>
                  {showDelete && (
                    <TiDelete
                      style={{ cursor: "default" }}
                      onClick={() => {
                        dispatch(removeBoard(board._id));
                      }}
                    />
                  )}
                </div>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      ))}

      <div className="m-2">
        <Card
          className="d-flex align-item-center justify-content-center"
          style={{
            width: "17rem",
            height: "90px",
            cursor: "pointer",
            backgroundColor: "#E7E9ED",
          }}
          onClick={() => {
            handleShow();
          }}
        >
          Create New Board
        </Card>

        <Modal
          size="sm"
          show={show}
          onHide={() => {
            handleClose();
            setBoardName("");
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Board Name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="text"
                className="form-control "
                placeholder="Add Board Name"
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                ref={innerRef}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit}>
              Add Board
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Boards;
