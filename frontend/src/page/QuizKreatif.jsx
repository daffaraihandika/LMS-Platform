import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import { GoReport } from "react-icons/go";

const QuizKreatif = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  const handleTambahQuizClick = () => {
    navigate("/tambah-quiz");
  };

  const getAllQuiz = async () => {
    try {
      const response = await axios.get("http://localhost:5000/quizzes");
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
    console.log("Link:", link);
    handleClose();
  };

  useEffect(() => {
    getAllQuiz();
    getAllTag();
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            Quiz Kreatif
          </span>
        </div>
        <div className="block">
          <button
            onClick={handleTambahQuizClick}
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Tambah Quiz
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white hover:bg-gray-100 text-teal-500 font-semibold py-2 px-4 border border-teal-500 rounded"
          >
            Join Quiz
          </button>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div className="bg-white p-8 rounded max-w-sm">
                <button onClick={handleClose}>&times;</button>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="border rounded py-2 px-3 w-full my-2"
                  placeholder="Enter link"
                />
                <button
                  onClick={handleSaveChanges}
                  className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                  Masuk Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <div className="mb-4">
          <div className="flex justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold">Quiz Kreatif</h2>
            </div>
            <div>
              <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                Kategori Quiz
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                {quiz.image && (
                  <img className="w-full" src={quiz.image} alt={quiz.title} />
                )}
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{quiz.title}</div>
                  <p className="text-gray-700 text-base">
                    Dibuat tanggal{" "}
                    {new Date(quiz.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  {quiz.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    >
                      {tag.nameTag}
                    </span>
                  ))}
                </div>
                <div className="px-6 py-4">
                  <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                    Mulai Quiz
                  </button>
                  <div className="flex">
                    <button className="bg-gray-200 hover:bg-gray-300 text-teal-500 font-semibold py-2 px-4 border border-teal-500 rounded mr-2">
                      <CiShare2 className="inline-block mr-1" />
                      Bagikan
                    </button>
                    <button
                      onClick={() => setModalShow(true)}
                      className="bg-gray-200 hover:bg-gray-300 text-teal-500 font-semibold py-2 px-4 border border-teal-500 rounded"
                    >
                      <GoReport className="inline-block mr-1" />
                      Laporkan
                    </button>
                    {modalShow && (
                      <div className="fixed inset-0 flex items-center justify-center">
                        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                        <div className="bg-white p-8 rounded max-w-sm">
                          <button onClick={() => setModalShow(false)}>
                            &times;
                          </button>
                          <div>
                            <h5 className="mb-4 font-bold">
                              Apa jenis masalah yang anda laporkan?
                            </h5>
                            <div className="flex flex-col">
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio"
                                  name="reportType"
                                />
                                <span className="ml-2">Plagiat</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio"
                                  name="reportType"
                                />
                                <span className="ml-2">Privasi</span>
                              </label>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  className="form-radio"
                                  name="reportType"
                                />
                                <span className="ml-2">
                                  Penghinaan & Pelecehan secara Online
                                </span>
                              </label>
                            </div>
                          </div>
                          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-4">
                            Laporkan
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizKreatif;
