import axios from 'axios';


const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {

    let changeabelUrl = url;

    if (country) {
        changeabelUrl = `${url}/countries/${country}/`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeabelUrl);

        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {

    }
};


export const featchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifitedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifitedData;
    } catch (error) {

    }
}

export const fetchCountryes = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}