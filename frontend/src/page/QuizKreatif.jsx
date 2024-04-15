import { React, useEffect, useState } from "react";
import {
  Container,
  Image,
  Button,
  Dropdown,
  Row,
  Col,
  Card,
  Badge,
  Stack,
} from "react-bootstrap";
import { GoReport } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import axios from "axios";
import NavbarQuiz from "../components/NavbarQuiz";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const QuizKreatif = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); //modal untuk button join quiz
  const [modalShow, setModalShow] = useState(false); //modal untuk button laporkan
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTambahQuizClick = () => {
    navigate("/tambah-quiz");
  };

  const getAllQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quizzes");
      console.log(response.data)
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTag = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tags");
      setTags(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    let formattedLink = link;
    if (!formattedLink.startsWith("http://") && !formattedLink.startsWith("https://")) {
      formattedLink = "http://" + formattedLink;
    }
    handleClose();
    window.open(formattedLink, "_blank");
  };

  const handleShareClick = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500); // Setelah 1.5 detik, atur status penyalinan kembali ke false
  };

  useEffect(() => {
    getAllQuiz();
    getAllTag();
  }, []);

  const buttonStyle = {
    backgroundColor: "#38B0AB",
    color: "#FFFFFF",
  };

  const handleDropdownItemClick = async (tag) => {
    try {
      let response;
      if (tag === "Semua") {
        response = await axios.get("http://localhost:5000/quizzes");
      } else {
        response = await axios.get(
          `http://localhost:5000/quizzes?tag=${tag.nameTag}`
        );
      }
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
    }
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
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowModal(true)}
                  style={{
                    width: "150px",
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #38B0AB",
                    color: "#38B0AB",
                  }}
                >
                  Join Quiz
                </Button>{" "}
                <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Masukkan Link</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicLink">
                        <Form.Label>Link Quiz</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter link"
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          autoFocus
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #38B0AB",
                        color: "#38B0AB",
                      }}
                      onClick={handleClose}
                    >
                      Tutup
                    </Button>
                    <Button style={buttonStyle} onClick={handleSaveChanges}>
                      Masuk Quiz
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle style={buttonStyle} id="dropdown-basic">
                    Kategori Quiz
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleDropdownItemClick("Semua")}
                    >
                      Semua Kategori
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {tags.map((tag) => (
                      <Dropdown.Item
                        key={tag.id}
                        onClick={() => handleDropdownItemClick(tag)}
                      >
                        {tag.nameTag}
                      </Dropdown.Item>
                    ))}
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
                          <p className="mb-0" style={{ fontSize: "13px" }}>
                            {quiz.jumlahSoal} Qs
                          </p>
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
                          <CopyToClipboard text={quiz.link} onCopy={handleShareClick}>
                            <div onClick={handleShareClick}>
                              <CiShare2 style={{ fontSize: "12px", color: "#38B0AB" }} />
                              Bagikan
                            </div>
                          </CopyToClipboard>
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
                          onClick={() => setModalShow(true)}
                        >
                          <GoReport
                            style={{ fontSize: "12px", color: "#38B0AB" }}
                          />
                          Laporkan
                        </Button>
                        <Modal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          size="md"
                          aria-labelledby="contained-modal-title-vcenter"
                          centered
                          backdrop="static"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                              <b>Laporkan Quiz</b>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <h5 className="mb-4">
                              <b>Apa jenis masalah yang anda laporkan ? </b>
                            </h5>
                            <div>
                              <Container className="h-screen d-flex align-items-center justify-content-center p-10">
                                <Row className="w-100 bg-light rounded p-3 d-flex flex-wrap gap-4 border">
                                  <Row className="d-flex align-items-center justify-content-start">
                                    <Col className="d-flex align-items-center col-10">
                                      <span>
                                        <b>Plagiat</b>
                                        <br />
                                        Quiz atau pertanyaan dalam quiz
                                        merupakan plagiat dari sumber lain tanpa
                                        izin atau atribusi yang tepat
                                      </span>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                      <Form.Check
                                        type="radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="d-flex align-items-center justify-content-start">
                                    <Col className="d-flex align-items-center col-10">
                                      <span>
                                        <b>Privasi</b>
                                        <br />
                                        Membagikan informasi pribadi, mengancam
                                        akan membagikan/menyebarkan informasi
                                        pribadi
                                      </span>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                      <Form.Check
                                        type="radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                      />
                                    </Col>
                                  </Row>
                                  <Row className="d-flex align-items-center justify-content-start">
                                    <Col className="d-flex align-items-center col-10">
                                      <span>
                                        <b>
                                          Penghinaan & Pelecehan secara Online
                                        </b>
                                        <br />
                                        Penghinaan, konten seksual yang tidak
                                        diinginkan, konten NSFW & grafis yang
                                        tidak diinginkan, pelecehan bertarget
                                      </span>
                                    </Col>
                                    <Col className="d-flex justify-content-end">
                                      <Form.Check
                                        type="radio"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                      />
                                    </Col>
                                  </Row>
                                </Row>
                              </Container>
                            </div>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button style={buttonStyle}>Laporkan</Button>
                          </Modal.Footer>
                        </Modal>
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
