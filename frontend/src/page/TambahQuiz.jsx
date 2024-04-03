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

const TambahQuiz = () => {
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
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default TambahQuiz