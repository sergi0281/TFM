//aquesta petició enviarà la informació al backend
import axios from 'axios';

const url = axios.create({
    baseURL: 'http://localhost:8000/phenapp/api/clinics/clinics/'
})
export const getClinics = () => {
    //return axios.get('http://localhost:8000/phenapp/api/clinics/clinics/');
    //podria guardar la variable en un res enlloc de fer el return, fent const res =
    return url.get('/')
}

export const creaClinic = (clinic) => url.post('/', clinic)
//return axios.post('http://localhost:8000/phenapp/api/clinics/clinics/');
    