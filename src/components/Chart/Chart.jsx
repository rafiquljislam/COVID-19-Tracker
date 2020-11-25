import React, { useEffect, useState } from 'react'
import { featchDailyData } from '../../api'
import { Line, Bar } from 'react-chartjs-2'
import style from './Chart.module.css';


const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
    const [dailydata, setDailydata] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailydata(await featchDailyData());
        }
        fetchAPI();
    }, [])

    const LineChart = (
        dailydata[0]
            ? (
                <Line
                    data={{
                        labels: dailydata.map(({ date }) => new Date(date).toLocaleDateString()),
                        datasets: [{
                            data: dailydata.map((date) => date.confirmed),
                            label: "Infected",
                            borderColor: "#3333ff",
                            fill: true,
                        },
                        {
                            data: dailydata.map((date) => date.deaths),
                            label: "Deaths",
                            borderColor: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                            fill: true,
                        }]
                    }}
                />) : null
    );

    const barChart = (
        confirmed ?
            (
                <Bar
                    data={{
                        labels: ['Infected', 'Recovered', 'Deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: [
                                "rgba(0, 0, 255, 0.5)",
                                "rgba(0, 255, 0, 0.5)",
                                "rgba(255, 0, 0, 0.5)"
                            ],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Curent state in ${country}` }
                    }}
                />
            )
            : null
    )
    return (
        <div className={style.container}>
            {country ? barChart : LineChart}
        </div>
    )
}

export default Chart
