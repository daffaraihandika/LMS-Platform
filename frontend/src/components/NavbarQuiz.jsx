import React from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";

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
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                Profile Settings
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#link">
                  <FaRegEdit style={{ fontSize: "18px", color: "#38B0AB" }} />
                  &nbsp;&nbsp;Edit
                </Dropdown.Item>
                <Dropdown.Item href="#link">
                  <IoNotificationsOutline
                    style={{ fontSize: "18px", color: "#38B0AB" }}
                  />
                  &nbsp;&nbsp;Notifikasi
                </Dropdown.Item>
                <Dropdown.Item href="#my-quiz">
                  <MdOutlineQuiz
                    style={{ fontSize: "18px", color: "#38B0AB" }}
                  />
                  &nbsp;&nbsp;My Quiz
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarQuiz;
