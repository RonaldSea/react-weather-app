import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  Box,
} from '@chakra-ui/react';

import { Search } from './components/Search';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { MainInfo } from './components/MainInfo';
import { EmptyState } from './components/EmptyState';
import { Highlights } from './components/Highlights';
import { Alert } from './components/Alert';
const utc = require('dayjs/plugin/utc');
const localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
dayjs.extend(utc)

function App() {
  const [inputSearch, setInputSearch] = useState("");
  const [error, setError] = useState({
    state: false,
    message: ""
  });
  const [weatherData, setWeatherData] = useState({});
  const inputHandler = (event) => {
    const value = event.target.value.trim();
    setInputSearch(value);
  }

  const formatTime = (unixTime, timeZone) => {
    return dayjs
      .unix(unixTime + timeZone)
      .utc()
      .format("LT")
  }

  const callAPI = () => {
    if (!inputSearch) {
      setError({ state: true, message: "Ingrese el nombre de alguna ciudad." });
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=${process.env.REACT_APP_API_KEY}&lang=es&units=metric`)
      .then(res => {
        if (res.ok) {
          setError({ state: false })
          return res.json()
        } else {
          setError({ state: true, message: "No se pudo obtener información para esta busqueda." });
          throw new Error("Status code error " + res.status);
        }
      })
      .then(data => {
        const obj = {
          name: data.name,
          country: data.sys.country,
          dt: formatTime(data.dt, data.timezone),
          icon: data.weather[0].icon,
          temp: data.main.temp,
          description: data.weather[0].description,
          info: [
            {
              name: "Sensación termica",
              firstMeasurement: Math.floor(data.main.feels_like),
              secondMeasurement: "",
              unit: "Grados centígrados"
            },
            {
              name: "Viento",
              firstMeasurement: data.wind.speed,
              secondMeasurement: "",
              unit: "m/s"
            },
            {
              name: "Amanecer y atardecer",
              firstMeasurement: formatTime(data.sys.sunrise, data.timezone),
              secondMeasurement: formatTime(data.sys.sunset, data.timezone),
              unit: ""
            },
            {
              name: "Humedad",
              firstMeasurement: data.main.humidity,
              secondMeasurement: "",
              unit: "%"
            },
            {
              name: "Visibilidad",
              firstMeasurement: data.visibility / 1000,
              secondMeasurement: "",
              unit: "km"
            },
            {
              name: "Presencia de nubes",
              firstMeasurement: data.clouds.all,
              secondMeasurement: "",
              unit: "%"
            },
          ]
        }
        setWeatherData(obj);
      })
      .catch(err =>
        console.log(err)
      )
  }

  const handleClose = () => {
    setError({ state: false })
  }


  return (
    <ChakraProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={["start", "start", "center"]}
        alignItems="center">

        <Box p={4} w={["full", "full", "50%"]}>
          <Search inputHandler={inputHandler} callAPI={callAPI} />
          <Alert error={error} handleClose={handleClose} />
        </Box>
        <Box display="grid" gridTemplateColumns={!!Object.keys(weatherData).length ? ["1fr", "1fr", "1fr 3fr"] : "1fr"} p={4} w="full" >
          {
            !!Object.keys(weatherData).length
              ? <>
                <MainInfo weatherData={weatherData} />
                <Highlights weatherData={weatherData} />
              </>
              : <EmptyState />
          }
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
