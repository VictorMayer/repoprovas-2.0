import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL === "prod" ? "link do deploy" : "http://localhost:4000";

function sendExam(body) {
    return axios.post(`${BASE_URL}/exams`, body);
}

function getExams() {
    return axios.get(`${BASE_URL}/exams`);
}

function getCategories() {
    return axios.get(`${BASE_URL}/categories`);
}

function getProfessors() {
    return axios.get(`${BASE_URL}/professors`);
}

function getDisciplines() {
    return axios.get(`${BASE_URL}/disciplines`);
}

function getPeriods() {
    return axios.get(`${BASE_URL}/periods`);
}

async function getInfo() {
    let categories, professors, disciplines, periods;
    await getCategories().then((answer) => categories = answer.data);
    await getProfessors().then((answer) => professors = answer.data);
    await getDisciplines().then((answer) => disciplines = answer.data);
    await getPeriods().then((answer) => periods = answer.data);

    return {
        categories,
        professors,
        disciplines,
        periods,
    }
}


export {
    sendExam,
    getExams,
    getInfo,
};
