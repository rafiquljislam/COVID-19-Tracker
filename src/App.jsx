import React from 'react'
import Cards from './components/Cards/Cards'
import Chart from './components/Chart/Chart'
import CountryPicker from './components/CountryPicker/CountryPicker'
import style from './App.module.css';
import { fetchData } from './api'

import coronaImage from './images/image.png';





class App extends React.Component {

  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handelCountryChange = async (country) => {
    console.log(country);
    const fetchdadata = await fetchData(country);
    this.setState({ data: fetchdadata, country: country });
  }

  render() {
    const { data } = this.state;
    const { country } = this.state;

    return (
      <div className={style.container}>
        <img src={coronaImage} alt="coronaVirasImage" className={style.image} />
        <Cards data={data} />
        <CountryPicker handelCountryChange={this.handelCountryChange} />
        <Chart data={data} country={country} />
        <p>Made By codewithrafiq.github.io</p>
      </div>
    );
  }
}

export default App

