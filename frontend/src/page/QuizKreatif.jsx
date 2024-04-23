import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";
import { GoReport } from "react-icons/go";
import { MdFormatListBulleted } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import NavbarQuiz from "../components/NavbarQuiz";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const QuizKreatif = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [link, setLink] = useState("");
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleTambahQuizClick = () => {
    navigate("/tambah-quiz");
  };

  const getAllQuiz = async () => {
    try {
      const response = await axios.get(
        "http://194.233.93.124:3030/quiz/quizzes"
      );
      setQuizzes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTag = async () => {
    try {
      const response = await axios.get("http://194.233.93.124:3030/quiz/tags");
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

  const handleRadioChange = (event) => {
    setSelectedReason(event.target.value);
  };

  useEffect(() => {
    getAllQuiz();
    getAllTag();
  }, []);

  return (
    <div>
      <NavbarQuiz />
      <div className="block">
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
      <div className="container mx-auto p-8">
        <div className="mb-4">
          <div className="flex justify-between mb-3 flex-col">
            <div>
              <p className="text-3xl font-semibold mb-8">Quiz Kreatif</p>
            </div>
            <div className="flex justify-between">
              <div>
                <button
                  onClick={handleTambahQuizClick}
                  className="bg-teal-500 hover:bg-teal-700 text-white text-sm py-2 px-6 rounded mr-2"
                >
                  Tambah Quiz
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-white hover:bg-gray-100 text-teal-500 text-sm py-2 px-12 border border-teal-500 rounded"
                >
                  Join Quiz
                </button>
              </div>

              <div className="relative inline-block text-left flex items-center">
                <TbCategory className="mr-3 text-teal-400 text-2xl mb-5" />
                <button
                  type="button"
                  className="text-sm bg-white text-gray-500 border border-gray-300 py-2 pr-56 pl-3 rounded-lg mb-4 text-left inline-flex items-center"
                >
                  Kategori Quiz
                </button>
              </div>
            </div>
          </div>
          <div className="container bg-slate-50 mx-auto p-6 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="max-w-sm rounded-lg overflow-hidden shadow-lg p-5 bg-white"
                >
                  <div className="font-semibold text-xl mb-4">{quiz.title}</div>
                  {quiz.image && (
                    <div>
                      <img
                        className="object-cover w-96 h-48 rounded"
                        src={quiz.image}
                        alt={quiz.title}
                      />
                    </div>
                  )}

                  <div className="flex items-center mt-5 gap-3">
                    <div className="flex h-full items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://3.bp.blogspot.com/-oa9m6Vjs78s/VMCqdcEo_lI/AAAAAAAAAqw/3GeZJLcpCYQ/s1600/IMG_0008.JPG"
                      />
                    </div>
                    <div className="flex w-full justify-between mt-2 mb-2">
                      <div className="flex-col">
                        <div>
                          <span className="text-sm text-gray-950">
                            Anya Felissa
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs">
                          Dibuat tanggal{" "}
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
                      <div className="flex items-center px-3 gap-2">
                        <MdFormatListBulleted className="text-orange-400" />
                        <p>10 Qs</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    {quiz.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block bg-orange-300 rounded-md px-3 py-1 text-xs text-red-600 mr-2"
                      >
                        {tag.nama_tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2 justify-between w-full">
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-base text-md py-1 px-14 rounded">
                      Mulai Quiz
                    </button>
                    <div className="flex">
                      <button className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500  border border-teal-500 rounded mr-2">
                        <CopyToClipboard text={quiz.link} onCopy={handleShareClick}>
                          <div onClick={handleShareClick} className="flex flex-col items-center justify-center">
                            <CiShare2 className=""/>
                            <p className="text-[9px] m-0">Bagikan</p>
                          </div>
                        </CopyToClipboard>
                      </button>
                      <button
                        onClick={() => setModalShow(true)}
                        className="items-center flex-col flex px-2 py-1 bg-white hover:bg-gray-300 text-teal-500 border border-teal-500 rounded"
                      >
                        <GoReport className="" />
                        <p className="text-[9px]">Laporkan</p>
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
    </div>
  );
};

export default QuizKreatif;
