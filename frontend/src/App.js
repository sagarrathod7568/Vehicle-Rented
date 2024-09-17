import React, { useState, useEffect } from "react";
import API from "./services/api"; // Use the API service
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import DatePicker from "react-datepicker";

const App = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [wheels, setWheels] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (wheels) {
      API.get(`/vehicles/${wheels}`)
        .then((res) => {
          setVehicleTypes(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [wheels]);

  useEffect(() => {
    if (selectedType) {
      API.get(`/vehicles/models/${selectedType}`)
        .then((res) => {
          setVehicleModels(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedType]);

  const handleSubmit = () => {
    const bookingData = {
      model: selectedModel,
      startDate,
      endDate,
    };
    API.post("/book", bookingData)
      .then(() => alert("Booking successful"))
      .catch((err) => alert(err.response.data.message));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Container>
            <h2>What is your name?</h2>
            <TextField
              label="First Name"
              onChange={(e) => setName({ ...name, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              onChange={(e) => setName({ ...name, lastName: e.target.value })}
            />
            <Button onClick={() => setStep(2)}>Next</Button>
          </Container>
        );
      case 2:
        return (
          <Container>
            <h2>Number of Wheels</h2>
            <RadioGroup onChange={(e) => setWheels(parseInt(e.target.value))}>
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="6" control={<Radio />} label="6" />
            </RadioGroup>
            <Button onClick={() => setStep(3)}>Next</Button>
          </Container>
        );
      case 3:
        return (
          <Container>
            <h2>Vehicle Type</h2>
            <RadioGroup onChange={(e) => setSelectedType(e.target.value)}>
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={<Radio />}
                  label={type}
                />
              ))}
            </RadioGroup>
            <Button onClick={() => setStep(4)}>Next</Button>
          </Container>
        );
      case 4:
        return (
          <Container>
            <h2>Select Model</h2>
            <RadioGroup onChange={(e) => setSelectedModel(e.target.value)}>
              {vehicleModels.map((model) => (
                <FormControlLabel
                  key={model}
                  value={model}
                  control={<Radio />}
                  label={model}
                />
              ))}
            </RadioGroup>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </Container>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default App;
