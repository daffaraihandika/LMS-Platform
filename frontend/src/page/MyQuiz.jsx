import { useParams } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { GoReport, GoTrash } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
import NavbarQuiz from "../components/NavbarQuiz";
import Alert from "react-bootstrap/Alert";

const MyQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  const { userId } = useParams();
  const { quizId } = useParams();

  const handleTambahQuizClick = () => {
    navigate("/tambah-quiz");
  };

  const getMyQuiz = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/quizzes/user/${userId}`
      );
      setQuizzes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTag = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tags");
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (quizId) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin akan menghapus quiz ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:5000/quiz/${quizId}`)
        .then((response) => {
          const message = response.data.msg;
          console.log(message);
          setDeleteMessage(message);
          navigate(`/my-quiz/${userId}`);
        })
        .catch((error) => {
          console.error("Error deleting quiz:", error);
        });
    }
  };

  useEffect(() => {
    getMyQuiz();
    getAllTag();
  }, [userId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeleteMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [deleteMessage]);

  const buttonStyle = {
    backgroundColor: "#38B0AB",
    color: "#FFFFFF",
  };

  return (
    <div>
      <NavbarQuiz />

      <Container>
        <Row>
          <Col>
            <div className="title">
              <h1>My Quiz</h1>
            </div>
            <div className="header d-flex justify-content-between align-items-center mb-3">
              <div>
                <Button style={buttonStyle} onClick={handleTambahQuizClick}>
                  Tambah Quiz
                </Button>{" "}
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle style={buttonStyle} id="dropdown-basic">
                    Kategori Quiz
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <Container className="h-screen d-flex align-items-center justify-content-center p-20">
            <Row className="w-100 bg-light rounded p-5 d-flex flex-wrap gap-5">
              {deleteMessage && (
                <Alert key="danger" variant="danger">
                  {deleteMessage}
                </Alert>
              )}
              {quizzes.map((quiz) => (
                <Card key={quiz.id} style={{ width: "22rem" }}>
                  {quiz.image && (
                    <div
                      className="d-flex justify-content-center align-items-center mt-3"
                      style={{ height: "170px" }}
                    >
                      <Card.Img
                        src={quiz.image}
                        style={{
                          width: "300px",
                          height: "170px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{quiz.title}</Card.Title>
                    <div className="d-flex align-items-center mb-4">
                      <Image
                        src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG"
                        roundedCircle
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <p className="mb-0" style={{ fontSize: "16px" }}>
                          {quiz.user.name}
                        </p>
                      </div>
                      <div
                        className="ml-auto d-flex align-items-center"
                        style={{ marginLeft: "60px" }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-start mb-4">
                      <Stack direction="horizontal" gap={2}>
                        {quiz.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            style={{
                              backgroundColor: "#F9A682",
                              color: "#B23E19",
                            }}
                            bg="none"
                          >
                            {tag.nameTag}
                          </Badge>
                        ))}
                      </Stack>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p className="mt-3" style={{ fontSize: "11px" }}>
                        Dibuat tanggal
                        {new Date(quiz.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <div className="d-flex">
                        <Button
                          variant="outlined-secondary"
                          size="sm"
                          className="btn-sm mr-2"
                          style={{
                            fontSize: "9px",
                          }}
                          onClick={() => handleDelete(quiz.id)}
                        >
                          <GoTrash
                            style={{ fontSize: "12px", color: "#FF0000" }}
                          />
                        </Button>
                        <Button
                          variant="outlined-secondary"
                          size="sm"
                          className="btn-sm mr-2"
                          style={{
                            fontSize: "9px",
                          }}
                        >
                          <CiShare2
                            style={{ fontSize: "12px", color: "#38B0AB" }}
                          />
                        </Button>
                        <Button
                          variant="outlined-secondary"
                          size="sm"
                          className="btn-sm"
                          style={{
                            fontSize: "9px",
                          }}
                        >
                          <GoReport
                            style={{ fontSize: "12px", color: "#38B0AB" }}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
};

export default MyQuiz;
