import React from "react";
const Weather = (props) => {
  if (props.error) {
    return <p className="property">{props.error}</p>;
  }
  return (
    <div className="property">
      <p>
        Location: {props.city} {props.country}
      </p>
      <p>Temperature: {props.temperature}</p>
      <p>Humidity: {props.humidity}</p>
      <p>Condition: {props.description}</p>
    </div>
  );
};

export default Weather;
