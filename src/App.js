import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "de3cfadf3a96bf4b8985b38405697a12";

export default class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }

  get_weather = async(e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    if (city) {
      const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ API_KEY }&units=metric`);
      const data = await api_url.json();

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset)
      let sunset_time = date.getHours()-5 + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_time,
        error: undefined,
      });
    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: 'Enter the name of the city'
      })
    }

  };

  render() {
    return (
      <div className='wrapper'>
        <Info/>
        <Form weather={ this.get_weather }/>
        <Weather
          temp={ this.state.temp }
          city={ this.state.city }
          country={ this.state.country }
          pressure={ this.state.pressure }
          sunset={ this.state.sunset }
          error={ this.state.error }
        />
      </div>
    )
  }
}
