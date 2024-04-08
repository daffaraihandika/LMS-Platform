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
import Spinner from "react-bootstrap/Spinner"; // Import ProgressBar component from React Bootstrap

const SaveQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [isDataComplete, setIsDataComplete] = useState(false);

    const checkDataCompletion = () => {
        const judulQuiz = localStorage.getItem("judulQuiz");
        const tagQuiz = JSON.parse(localStorage.getItem("tagQuiz"));
        const jumlahSoal = localStorage.getItem("deskripsiQuiz");
        const selectedFileBase64 = localStorage.getItem("file");

        const dataComplete =
            judulQuiz && tagQuiz && jumlahSoal && selectedFileBase64;
        setIsDataComplete(dataComplete);
    };

    useEffect(() => {
        checkDataCompletion();
    }, []);

    const handleSave = () => {
        if (!isDataComplete) {
            alert("Kamu harus melengkapi nilai2 di page sebelumnya ya");
            return; // Hentikan eksekusi fungsi
        }
        setIsLoading(true);

        const judulQuiz = localStorage.getItem("judulQuiz");
        const tagQuiz = JSON.parse(localStorage.getItem("tagQuiz"));

        const deskripsiQuiz = localStorage.getItem("deskripsiQuiz");
        const selectedFileBase64 = localStorage.getItem("file");

        if (selectedFileBase64 != null) {
            // Konversi base64 string ke blob
            const byteCharacters = atob(selectedFileBase64.split(",")[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "image/jpeg" });

            // Buat objek File dari blob
            const selectedFile = new File([blob], "selectedFile.jpg", {
                type: "image/jpeg",
            });
            let link = document.getElementById("link").value;
            if (link == "") {
                alert("Harap isi link tersebut");
                setIsLoading(false);
            } else {
                const formData = new FormData();
                formData.append("title", judulQuiz);
                formData.append("jumlahSoal", parseInt(deskripsiQuiz));
                tagQuiz.forEach((tag, index) => {
                    formData.append(`tags[${index}][nameTag]`, tag.value);  
                });
                formData.append("image", selectedFile);
                formData.append("link", link);
                formData.append("userId", 1);

                axios
                    .post("http://localhost:5000/new-quiz", formData)
                    .then((response) => {
                        setIsLoading(false);
                        console.log("Data berhasil disimpan:", response.data);
                        alert("Data berhasil disimpan");
                        // Hapus data dari localStorage setelah berhasil disimpan
                        localStorage.removeItem("judulQuiz");
                        localStorage.removeItem("tagQuiz");
                        localStorage.removeItem("deskripsiQuiz");
                        localStorage.removeItem("file");
                        navigate("/");
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        console.error("Gagal menyimpan data:", error);
                        alert(error);
                    });
            }
        } else {
            setIsLoading(false);
            alert("Harap lengkapi data di page sebelumnya");
            navigate(-1);
            return;
        }
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
                        <div className="mx-auto">
                            {isLoading && <Spinner animation="border" />}
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
                                            <Button
                                                style={{
                                                    backgroundColor: "#60C0BC",
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                }}
                                            >
                                                Lanjutkan Pada Quiziz
                                            </Button>
                                            <p
                                                style={{
                                                    fontSize: 15,
                                                    marginTop: 5,
                                                    color: "GrayText",
                                                }}
                                            >
                                                Klik tombol diatas untuk mengarahkan pada quiziz
                                            </p>
                                            <div className="mb-3">
                                                <label htmlFor="judulQuiz" className="form-label">
                                                    Link Quiz
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control fill-input"
                                                    style={{
                                                        backgroundColor: "#f5f5f5",
                                                    }}
                                                    id="link"
                                                    name="link"
                                                    placeholder="Masukkan Link quiz"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3  col-md-12 col-sm-12 text-center mt-4"></div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                        <Row className="justify-content-end mt-3 mb-4">
                            <Col xs="auto" className="mr-2">
                                <Button variant="btn btn-outline-success">Kembali</Button>
                            </Col>
                            <Col xs="auto">
                                <Button
                                    onClick={handleSave}
                                    style={{
                                        backgroundColor: "#60C0BC",
                                        paddingRight: 10,
                                        paddingLeft: 10,
                                    }}
                                >
                                    Simpan
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SaveQuiz;
