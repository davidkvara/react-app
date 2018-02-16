// Temperature converter. Lifting state up example. More at: https://reactjs.org/docs/lifting-state-up.html
import React from "react";
import "./css/calculator.css";
import classNames from "classnames";

const Header = props => {
  let goodClass = classNames({ "h-verdict": true, good: props.good });
  return <h4 className={goodClass}>{props.children}</h4>;
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return (
      <Header good={true}>
        The water <b>would</b> boil
      </Header>
    );
  }
  return (
    <Header good={false}>
      The water <b>would not</b> boil
    </Header>
  );
}

const scaleName = {
  c: "Celsius",
  f: "Fahrenheit"
};

const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;
const toFahrenheit = celsius => celsius * 9 / 5 + 32;

function tryConvert(temp, convert) {
  const input = parseFloat(temp);
  if (isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded;
}

class TemperatureInput extends React.Component {
  handleChange = e => {
    this.props.onTemperatureChange(e.target.value);
  };

  render() {
    const { temperature, scale } = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleName[scale]}:</legend>
        <input
          type="text"
          value={temperature}
          onChange={this.handleChange}
          className="input"
        />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  state = { temperature: "", scale: "c" };

  handleCelsiusChange = temperature => {
    this.setState({ temperature, scale: "c" });
  };

  handleFahrenheitChange = temperature => {
    this.setState({ temperature, scale: "f" });
  };

  render() {
    const { temperature, scale } = this.state;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div className="calc-App">
        <TemperatureInput
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
          scale="c"
        />
        <TemperatureInput
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
          scale="f"
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

export default Calculator;
