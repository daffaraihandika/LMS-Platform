import { React, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { GoReport } from "react-icons/go";
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

const QuizKreatif = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const handleTambahQuizClick = () => {
    navigate("/tambah-quiz");
  };

  const getAllQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quizzes");
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

  useEffect(() => {
    getAllQuiz();
    getAllTag();
  }, []);

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
              <h1>Quiz Kreatif</h1>
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
                        <p className="mb-0 mt-3" style={{ fontSize: "16px" }}>
                          {quiz.user.name}
                        </p>
                        <p className="mb-0" style={{ fontSize: "11px" }}>
                          Dibuat tanggal
                          {new Date(quiz.createdAt).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <div
                        className="ml-auto d-flex align-items-center"
                        style={{ marginLeft: "60px" }}
                      >
                        <div className="d-flex align-items-center">
                          <IoIosNotificationsOutline />
                          <p className="mb-0" style={{ fontSize: '13px' }}>{quiz.jumlahSoal} Qs</p>
                        </div>
                      </div>
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
                      <Button
                        style={{
                          backgroundColor: "#38B0AB",
                          color: "#FFFFFF",
                          width: "150px",
                        }}
                        className="btn-sm"
                      >
                        Mulai Quiz
                      </Button>
                      <div className="d-flex">
                        <Button
                          variant="outlined-secondary"
                          size="sm"
                          className="me-2 btn-sm"
                          style={{
                            width: "60px",
                            height: "auto",
                            fontSize: "10px",
                            color: "#38B0AB",
                          }}
                        >
                          <CiShare2
                            style={{ fontSize: "12px", color: "#38B0AB" }}
                          />
                          Bagikan
                        </Button>
                        <Button
                          variant="outlined-secondary"
                          size="sm"
                          className="btn-sm"
                          style={{
                            width: "60px",
                            height: "auto",
                            fontSize: "10px",
                            color: "#38B0AB",
                          }}
                        >
                          <GoReport
                            style={{ fontSize: "12px", color: "#38B0AB" }}
                          />
                          Laporkan
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

export default QuizKreatif;
