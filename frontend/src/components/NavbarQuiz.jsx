import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

const NavbarQuiz = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">
              <Image
                src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG"
                roundedCircle
                style={{ width: "30px", height: "30px" }}
              />
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
  );
};

export default NavbarQuiz;
