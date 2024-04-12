import { React, useState, useEffect } from "react";
import { Container, Spinner, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaCheck,
} from "react-icons/fa";
import {
    IoCloudUpload,
} from "react-icons/io5";
import axios from "axios";
import Select from "react-select";
import NavbarQuiz from "../components/NavbarQuiz";


const TambahQuiz = () => {
    const [title, setTitle] = useState("");
    const [jumlahSoal, setJumlahSoal] = useState("");
    const [link, setLink] = useState("");
    const [userId, setUserId] = useState("");
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);
    const [showQuizizView, setShowQuizizView] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

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

    const handleNextClick = () => {
        setIsLoading(false);
        setShowQuizizView(true);
    };

    const handlePrevClick = () => {
        setIsLoading(false);
        setShowQuizizView(false);
    };

    const handleBackClick = () => {
        navigate("/")
    };

    const handleTagChange = (selectedOptions) => {
        setTags(selectedOptions);
    };

    const handleKeyDown = (event) => {
        if (event.key === " " && event.target.value.trim() !== "") {
            const newTag = { value: event.target.value.trim(), label: event.target.value.trim() };
            setTags([...tags, newTag]);
            event.target.value = "";
            event.preventDefault();
        }
    };

    const handleFileInputChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setSelectedFileName(selectedFile.name);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
        setSelectedFileName(droppedFile.name);
    };

    const getAllTag = async () => {
        try {
            const response = await axios.get("http://localhost:5000/tags")
            console.log(response)
            setTagOptions(response.data.map(tag => ({ value: tag.nameTag, label: tag.nameTag })));
        } catch (error) {
            console.log(error)
        }
    }

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("jumlahSoal", jumlahSoal);
            formData.append("link", link);
            formData.append("userId", userId);
            formData.append("image", file);

            // Menambahkan tags ke formData
            tags.forEach((tag, index) => {
                formData.append(`tags[${index}][nameTag]`, tag.value);
            });

            const response = await axios.post("http://localhost:5000/new-quiz", formData);
            console.log(response.data);
            console.log("Data berhasil disimpan!!");
            navigate("/")
        } catch (error) {
            console.error("Error saving quiz:", error.response.data.msg);
            setIsLoading(false);
            setErrMsg(error.response.data.msg)
        }
    };

    useEffect(() => {
        getAllTag()
    }, [])


    return (
        <div>
            <NavbarQuiz />

            {!showQuizizView ? (
                <Container>
                    <Row>
                        <Col>
                            <div className="title">
                                <h1>Quiz Kreatif</h1 >
                            </div >
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
                                                        ID User
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control fill-input"
                                                        style={{
                                                            backgroundColor: "#f5f5f5",
                                                        }}
                                                        id="userId"
                                                        name="userId"
                                                        placeholder="User Id"
                                                        value={userId}
                                                        onChange={(e) => setUserId(e.target.value)}
                                                    />
                                                </div>
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
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
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
                                                        onChange={handleTagChange}
                                                        options={tagOptions}
                                                        isMulti
                                                        placeholder="Masukkan tag quiz"
                                                        styles={customStyles}
                                                        onKeyDown={handleKeyDown}
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
                                                        value={jumlahSoal}
                                                        onChange={(e) => setJumlahSoal(e.target.value)}
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
                                                            <IoCloudUpload style={{ fontSize: "3rem", marginBottom: "1rem" }} />
                                                            <p>Seret dan lepas di sini Atau</p>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={handleFileInputChange} // Menambahkan onChange handler
                                                                style={{ display: "none" }}
                                                                id="fileInput"
                                                            />
                                                            <label htmlFor="fileInput">
                                                                <Button
                                                                    className=""
                                                                    style={{ backgroundColor: "#60C0BC" }}
                                                                    as="span"
                                                                >
                                                                    Pilih Gambar
                                                                </Button>
                                                            </label>

                                                            {selectedFileName && (
                                                                <p style={{ marginTop: "10px" }}>File yang dipilih: {selectedFileName}</p>
                                                            )}
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
                                    <Button variant="btn btn-outline-success" onClick={handleBackClick}>Kembali</Button>
                                </Col>
                                <Col xs="auto">
                                    <Button
                                        onClick={handleNextClick}
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
                        </Col >
                    </Row >
                </Container >
            ) : (
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
                                            <h6
                                                style={{
                                                    color: "#60C0BC",
                                                }}
                                            >
                                                <b> Quiz Info</b>
                                            </h6>
                                        </div>
                                        <hr
                                            className="flex-grow-1"
                                            style={{ borderTop: "2px solid transparent" }}
                                        />{" "}
                                        {/* Garis penghubung */}
                                        <div>
                                            <h5
                                                style={{
                                                    color: "#60C0BC",
                                                }}
                                            >
                                                <b>Quiziz</b>
                                            </h5>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mx-2">
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
                                                    color: "#28a745",
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
                                                <a href="https://quizizz.com/admin?modal=contentCreation&type=quiz&ctaSource=quizmaker-main&fromPage=quizmaker&lng=en" target="_blank">
                                                    <Button
                                                        style={{
                                                            backgroundColor: "#60C0BC",
                                                            paddingRight: 10,
                                                            paddingLeft: 10,
                                                        }}
                                                    >
                                                        Lanjutkan Pada Quiziz
                                                    </Button>
                                                </a>
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
                                                        value={link}
                                                        onChange={(e) => setLink(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-3  col-md-12 col-sm-12 text-center mt-4"></div>
                                        </div>
                                    </form>
                                </div>
                            </Card>
                            {errMsg && <Alert variant="danger" className="mt-3">{errMsg}</Alert>}
                            <Row className="justify-content-end mt-3 mb-4">
                                <Col xs="auto" className="mr-2">
                                    <Button variant="btn btn-outline-success" onClick={handlePrevClick}>Kembali</Button>
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
            )}

        </div >
    );
};

export default TambahQuiz;
