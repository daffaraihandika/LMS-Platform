import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import NavbarQuiz from '../components/NavbarQuiz';
import { FaCheck } from 'react-icons/fa';
import { IoCloudUpload } from 'react-icons/io5';

const TambahQuiz = () => {
    const [title, setTitle] = useState('');
    const [jumlahSoal, setJumlahSoal] = useState('');
    const [link, setLink] = useState('');
    const [userId, setUserId] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);
    const [showQuizizView, setShowQuizizView] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [tagOptions, setTagOptions] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getAllTag = async () => {
            try {
                const response = await axios.get("http://localhost:5000/tags");
                setTagOptions(response.data.map(tag => ({ value: tag.nameTag, label: tag.nameTag })));
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        getAllTag();
    }, []);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setSelectedFileName(file.name);
        }
    };

    const handleTagChange = selectedOptions => {
        setTags(selectedOptions);
    };

    const handleNextClick = () => {
        setShowQuizizView(true);
    };

    const handlePrevClick = () => {
        setShowQuizizView(false);
    };

    const handleSave = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('jumlahSoal', jumlahSoal);
        formData.append('link', link);
        formData.append('userId', userId);
        formData.append('file', file);
        tags.forEach((tag, index) => {
            formData.append(`tags[${index}][nameTag]`, tag.value);
        });

        try {
            const response = await axios.post('http://localhost:5000/new-quiz', formData);
            console.log(response.data);
            navigate('/');
        } catch (error) {
            setErrMsg(error.response?.data?.msg || "An error occurred");
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* <NavbarQuiz /> */}
            <div className="container mx-auto p-8">
                {!showQuizizView ? (
                    <>
                        <div className="mb-6">
                            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
                                User ID
                            </label>
                            <input
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={e => setUserId(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">
                                Tags
                            </label>
                            <Select
                                id="tags"
                                value={tags}
                                onChange={handleTagChange}
                                options={tagOptions}
                                isMulti
                                className="basic-multi-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                File Upload
                            </label>
                            <div className="flex items-center">
                                <IoCloudUpload className="text-3xl text-gray-400" />
                                <input
                                    type="file"
                                    onChange={handleFileInputChange}
                                    className="ml-4"
                                />
                            </div>
                            {selectedFileName && <div className="mt-2 text-sm text-gray-600">Selected file: {selectedFileName}</div>}
                        </div>
                        <div className="flex justify-between">
                            <button onClick={handlePrevClick} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Previous
                            </button>
                            <button onClick={handleNextClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            {isLoading && <div className="flex justify-center items-center">
                                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>}
                            {errMsg && <div className="text-red-500 text-xs italic mt-4">{errMsg}</div>}
                            <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TambahQuiz;
