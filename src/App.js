import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Weather from './Component/Weather';
import Form from './Component/Form';
import './App.css';


// https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=${API_key}&units=metric

const API_key="a552bbacdd8190eca3d969550f815626";

class App extends Component{
  
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
    // this.getWeather();

    this.weathericon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }

  }

  get_Weathericon(icons, range_id){
    switch(true){
      case range_id >= 200 && range_id <= 232:
        this.setState({icon:icons.Thunderstorm});
        break;
      case range_id >= 300 && range_id <= 321:
        this.setState({icon:icons.Drizzle});
        break;
      case range_id >= 500 && range_id <= 531:
        this.setState({icon:icons.Rain});
        break;
      case range_id >= 600 && range_id <= 622:
        this.setState({icon:icons.Snow});
        break;
      case range_id >= 701 && range_id <= 781:
        this.setState({icon:icons.Atmosphere});
        break;  
      case range_id === 800 :
        this.setState({icon:icons.Clear});
        break;  
      case range_id >= 801 && range_id <= 804:
        this.setState({icon:icons.Clouds});
        break;  
      default:
        this.setState({icon:icons.Clouds});
    }
  }


  getWeather = async (e) => {

   e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_key}&units=metric`)
    
      const response = await api_call.json()
      console.log(response)

      this.setState({
        city:`${response.name}`,
        country: `${response.sys.country}`,
        main: response.weather[0].main,
        celsius:response.main.temp,
        temp_max:response.main.temp_max,
        temp_min:response.main.temp_min,
        description:response.weather[0].description,
        error: false
      });
      // setting icons
      this.get_Weathericon(this.weathericon, response.weather[0].id);
    }
    else{
      this.setState({error:true});
    }
  };
  

  render(){
    return (
    <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error} />
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      celsius={this.state.celsius}
      temp_max={this.state.temp_max}  
      temp_min={this.state.temp_min} 
      description={this.state.description} 
      weathericon={this.state.icon}
      />
    </div>
  );
}
}

export default App;
