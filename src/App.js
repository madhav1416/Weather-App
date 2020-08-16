import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Weather from "./Weather";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      temperature: undefined,
      humidity: undefined,
      description: undefined,
      country: undefined,
      error: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  Title = () => {
    return (
      <section className="form-gradient">
        <div className="header pt-3 peach-gradient">
          <h1 className="class-title font-weight-bold">Weather App</h1>
          <h3 className="class-text font-weight-bold">
            Find out Temperature,Condition and more...
          </h3>
        </div>
      </section>
    );
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const api = await fetch(
        `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.country}&appid=9c810cfccb7f9f3890ef7086620890b8&units=metric`
      );
      const { main, sys, name, weather } = await api.json();
      this.setState({
        temperature: main.temp,
        city: name,
        country: sys.country,
        humidity: main.humidity,
        description: weather[0].description,
      });
    } catch (e) {
      this.setState({
        city: undefined,
        temperature: undefined,
        humidity: undefined,
        description: undefined,
        country: undefined,
        error: "Enter a valid values",
      });
    }
  };
  render() {
    return (
      <div className="card w-50 p-3 mx-auto " id="card">
        <this.Title />
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter City..."
            id="city"
            name="city"
            onChange={this.handleChange}
          />
          <input
            type="text"
            id="country"
            placeholder="Enter Country..."
            name="country"
            className="form-control"
            onChange={this.handleChange}
          />
          <input type="submit" value="Get Weather" />
        </form>
        <Weather
          city={this.state.city}
          country={this.state.country}
          temperature={this.state.temperature}
          description={this.state.description}
          humidity={this.state.humidity}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
