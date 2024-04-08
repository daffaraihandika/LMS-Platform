import { React, useEffect, useState } from "react";

import { Navbar, Container, Nav, Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { GoReport } from "react-icons/go";
import { CiCloudOn, CiShare2 } from "react-icons/ci";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import {
    FaRegEdit,
    FaCheckCircle,
    FaCheck,
    FaUpload,
    FaFileUpload,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faclous } from "@fortawesome/free-solid-svg-icons";
import {
    IoCloudUploadOutline,
    IoCloudUpload,
    IoCloudUploadSharp,
} from "react-icons/io5";

import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar"; // Import ProgressBar component from React Bootstrap
import Select from "react-select";


const TambahQuiz = () => {

    const [tags, setTags] = useState([]);

    const navigate = useNavigate();


    const handleTambahQuizClick = () => {
        if (file != null) {
            localStorage.setItem("judulQuiz", document.getElementById("judulQuiz").value);
            localStorage.setItem("tagQuiz", JSON.stringify(tags));
            localStorage.setItem("deskripsiQuiz", document.getElementById("deskripsiQuiz").value);

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                localStorage.setItem("file", base64String);
                navigate("/save-quiz"); // Pindah ke halaman selanjutnya setelah file berhasil disimpan
            };
            reader.readAsDataURL(file); // Membaca file sebagai base64 string
        } else {
            alert("Harap pilih gambar")
        }
    };



    const handleChange = (selectedOptions) => {
        setTags(selectedOptions);
    };

    const tagOptions = [
        { value: "tag1", label: "Tag 1" },
        { value: "tag2", label: "Tag 2" },
        { value: "tag3", label: "Tag 3" },
    ];

    const customStyles = {
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "orange",
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white",
        }),
    };


    const [file, setFile] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
    };

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };


    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
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

            <Container>
                <Row>
                    <Col>
                        <div className="title">
                            <h1>
                                <b>Quiz Kreatif</b>
                            </h1>
                        </div>
                        <div className="header d-flex justify-content-between align-items-center">
                            <div className="container mt-5 mx-5">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5
                                            style={{
                                                color: "#60C0BC",
                                            }}
                                        >
                                            <b> Quiz Info</b>
                                        </h5>
                                    </div>
                                    <hr
                                        className="flex-grow-1"
                                        style={{ borderTop: "2px solid transparent" }}
                                    />{" "}
                                    {/* Garis penghubung */}
                                    <div>
                                        <h6
                                            style={{
                                                color: "#60C0BC",
                                            }}
                                        >
                                            <b>Quiziz</b>
                                        </h6>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mx-2">
                                    <div>
                                        <FaCheck
                                            style={{
                                                border: "2px solid #60C0BC",
                                                borderRadius: "50%",
                                                fontSize: 25,
                                                color: "#28a745",
                                                padding: 5,
                                            }}
                                        />
                                    </div>
                                    <hr
                                        className="flex-grow-1"
                                        style={{ borderTop: "2px solid #60C0BC" }}
                                    />{" "}
                                    {/* Garis penghubung */}
                                    <div>
                                        <FaCheck
                                            style={{
                                                border: "2px solid #60C0BC",
                                                borderRadius: "50%",
                                                fontSize: 25,
                                                color: "#60C0BC",
                                                padding: 5,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Card className="mt-3">
                            <div className="container mt-5">
                                <form action="" method="post">
                                    <div className="row">
                                        <div className="col-lg-9 col-md-12 col-sm-12 ">
                                            <div className="mb-3">
                                                <label htmlFor="judulQuiz" className="form-label">
                                                    Judul Quiz
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control fill-input"
                                                    style={{
                                                        backgroundColor: "#f5f5f5",
                                                    }}
                                                    id="judulQuiz"
                                                    name="judulQuiz"
                                                    placeholder="Masukkan judul quiz"
                                                />
                                                <p
                                                    style={{
                                                        fontSize: 15,
                                                        marginTop: 5,
                                                        color: "GrayText",
                                                    }}
                                                >
                                                    Buat judul dengan spesifik sesuai dengan quiz yang
                                                    dibuat
                                                </p>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="tagQuiz" className="form-label">
                                                    Tag Quiz
                                                </label>
                                                <Select
                                                    value={tags}
                                                    onChange={handleChange}
                                                    options={tagOptions}
                                                    isMulti
                                                    placeholder="Masukkan tag quiz"
                                                    styles={customStyles}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="deskripsiQuiz" className="form-label">
                                                    Jumlah Quiz
                                                </label>
                                                <input
                                                    style={{
                                                        backgroundColor: "#f5f5f5",
                                                    }}
                                                    className="form-control"
                                                    id="deskripsiQuiz"
                                                    name="deskripsiQuiz"
                                                    rows="1"
                                                    placeholder="Masukkan Jumlah Quiz"
                                                ></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-3  col-md-12 col-sm-12 text-center mt-4">
                                            <Card
                                                style={{
                                                    backgroundColor: "#f5f5f5",
                                                }}
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                            >
                                                <Card.Body>
                                                    <Card.Title>Upload File</Card.Title>
                                                    <Card.Text>
                                                        <IoCloudUpload
                                                            style={{ fontSize: "3rem", marginBottom: "1rem" }}
                                                        />
                                                        <p>Seret dan lepas di sini Atau</p>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileInputChange}
                                                            style={{ display: "none" }}
                                                            id="fileInput"
                                                        />
                                                        <label htmlFor="fileInput">
                                                            <Button
                                                                className=""
                                                                style={{
                                                                    backgroundColor: "#60C0BC",
                                                                }}
                                                                as="span"
                                                            >
                                                                Pilih Gambar
                                                            </Button>
                                                        </label>
                                                        {file && <p>File yang dipilih: {file.name}</p>}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                        <Row className="justify-content-end mt-3 mb-4">
                            <Col xs="auto" className="mr-2">
                                <Button variant="btn btn-outline-success">Kembali</Button>
                            </Col>
                            <Col xs="auto">
                                <Button onClick={handleTambahQuizClick}
                                    style={{
                                        backgroundColor: "#60C0BC",
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                    }}
                                >
                                    Selanjutnya
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TambahQuiz;
