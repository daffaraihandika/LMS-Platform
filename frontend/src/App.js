import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizKreatif from "./page/QuizKreatif";
import TambahQuiz from "./page/TambahQuiz";
import MyQuiz from "./page/MyQuiz";
import EditQuiz from "./page/EditQuiz";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuizKreatif />} />
          <Route path="/tambah-quiz" element={<TambahQuiz />} />
          <Route path="/my-quiz/:userId" element={<MyQuiz />} />
          <Route path="/edit-quiz/:quizId" element={<EditQuiz />} />

          {/* <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/influencer-detail/:username" element={<StatistikInfluencer/>}/>
        <Route path="/video-detail" element={<VideoDetail/>}/>
        <Route path="/statistic-prediction/:username" element={<PrediksiStatistik/>}/>
        <Route path="/search-by-keyword" element={<SearchByKeyword/>}/>
        <Route path="/search-influencer/:keyword" element={<TopInfluencer/>}/>
        <Route path="/search-content/:keyword" element={<TopContent/>}/> */}
          {/* <Route path="/search-influencer" element={<SearchByKeyword/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
