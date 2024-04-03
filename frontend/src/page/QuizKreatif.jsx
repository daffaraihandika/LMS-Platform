import { React, useEffect, useState } from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { GoReport } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';

const QuizKreatif = () => {
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate();

    const handleTambahQuizClick = () => {
        navigate('/tambah-quiz');
    };

    const getAllQuiz = async () => {
        try {
            const response = await axios.get('http://localhost:5000/quizzes')
            setQuizzes(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllQuiz()
    });

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">
                                <Image src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG" roundedCircle style={{ width: '30px', height: '30px' }} />
                            </Nav.Link>
                            <Nav.Link href="#home">Raka</Nav.Link>
                            <Nav.Link href="#link">
                                <FaRegEdit />
                            </Nav.Link>
                            <Nav.Link href="#link">
                                <IoIosNotificationsOutline />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col>
                        <div className="title">
                            <h1>Quiz Kreatif</h1>
                        </div>
                        <div className="header d-flex justify-content-between align-items-center">
                            <div>
                                <Button variant="success" onClick={handleTambahQuizClick}>Tambah Quiz</Button>{' '}
                            </div>
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-start">
                            {quizzes.map(quiz => (
                                <Card key={quiz.id} style={{ width: '24rem', margin: '20px' }}>
                                    <Card.Title>{quiz.title}</Card.Title>
                                    {quiz.image && <Card.Img variant="top" src={quiz.image} />}
                                    <Card.Body className="d-flex flex-column align-items-start ">
                                        <div className="d-flex align-items-center mb-2">
                                            <Image src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG" roundedCircle style={{ width: '30px', height: '30px', marginRight: '10px' }} />
                                            <div style={{ marginRight: '150px' }}>
                                                <p className="mb-0">{quiz.user.name}</p>
                                                <p className="mb-0">{new Date(quiz.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            </div>
                                            <div className="ml-auto d-flex align-items-center"> {/* Tambahkan class ml-auto di sini */}
                                                <div className="d-flex align-items-center" >
                                                    <IoIosNotificationsOutline />
                                                    <p className="mb-0">{quiz.jumlahSoal} Qs</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-start">
                                            <Stack direction="horizontal" gap={2}>
                                                {quiz.tags.map(tag => (
                                                    <Badge key={tag.id} bg="primary">{tag.nameTag}</Badge>
                                                ))}
                                            </Stack>
                                        </div>
                                    </Card.Body>
                                    <div className="d-flex justify-content-between">
                                        <Button variant="outline-dark" className="btn-sm">Go Somewhere</Button>
                                        <div className="d-flex">
                                            <Button variant="outline-dark" size="sm" className="me-2 btn-sm" style={{ width: '60px', height: 'auto', fontSize: '10px' }}>
                                                <CiShare2 style={{ fontSize: '12px' }} />
                                                Bagikan
                                            </Button>
                                            <Button variant="outline-dark" size="sm" className="btn-sm" style={{ width: '60px', height: 'auto', fontSize: '10px' }}>
                                                <GoReport style={{ fontSize: '12px' }} />
                                                Laporkan
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                    </Col>
                </Row>
            </Container>
            {/* <div className="subtitle">
                <p>Ini adalah quiz untuk prang yang kreatif saja, yang bodoh tidak usah quiz!</p>
            </div>

            <div>
                <p>Quiz 1dfggfdsfd</p>
            </div> */}
        </div>

    )
}

export default QuizKreatif