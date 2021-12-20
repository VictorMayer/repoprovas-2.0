import "./assets/reset.css";
import { useEffect, useState } from "react";
import { getInfo } from "./services/Repoprovas";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DisciplineExams from "./components/pages/DisciplineExams.js";
import ProfessorExams from "./components/pages/ProfessorExams.js";
import Disciplines from "./components/pages/Disciplines.js";
import Professors from "./components/pages/Professors.js";
import ExamsContext from './contexts/ExamsContext.js';
import Upload from "./components/pages/Upload.js";
import Search from "./components/pages/Search.js";
import Home from './components/pages/Home.js';

function App() {
    const [formData, setFormData] = useState(false);
    const [exams , setExams] = useState([]);

    useEffect(() => {
        getInfo().then(result => setFormData(result));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ExamsContext.Provider value={{ formData, setFormData, exams, setExams }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Home/>}/>
                    <Route path='/upload' exact element={<Upload/>}/>
                    <Route path='/search' exact element={<Search/>}/>
                    <Route path='/search/professors' exact element={<Professors/>}/>
                    <Route path='/search/disciplines' exact element={<Disciplines/>}/>
                    <Route path='/search/professors/:id/exams' exact element={<ProfessorExams/>}/>
                    <Route path='/search/disciplines/:id/exams' exact element={<DisciplineExams/>}/>
                    <Route path='*' element={<Navigate to="/" replace />} />    
                </Routes>
            </BrowserRouter>
        </ExamsContext.Provider>
    );
}

export default App;
