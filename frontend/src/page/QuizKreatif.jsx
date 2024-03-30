import React from 'react'
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import axios from 'axios';

const QuizKreatif = () => {
    const getAllQuiz = async () => {
        try {
            const response = await axios.get('http://localhost:5000/quizzes')
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

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
            <div className="title">
                <h1>Quiz Kreatif</h1>
            </div>
            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <Button variant="success">Tambah Quiz</Button>{' '}
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
            <div className="subtitle">
                <p>Ini adalah quiz untuk prang yang kreatif saja, yang bodoh tidak usah quiz!</p>
            </div>

            <div>
                <p>Quiz 1dfggfdsfd</p>
            </div>
        </div>

    )
}

export default QuizKreatif