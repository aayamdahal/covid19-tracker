import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import "./App.css";
import Stats from "./components/Stats";
import Map from "./components/Map";
import { FormControl, MenuItem, Select } from "@mui/material";
import Table from "./components/Table";
import { sortData } from "./sortdata";
import "leaflet/dist/leaflet.css";
import { numberWithCommas } from "./Helper";
import { MdCoronavirus } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { GiDeathSkull } from "react-icons/gi";

function App() {
  const [countries, setCountries] = useState([]); //listing countries
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [country, setCountry] = useState("Nepal"); //managing country's state
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries/np")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const fetchCountriesData = async () => {
      setIsLoading(true);
      setHasError(false);
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        const data = await response.json();
        setCountries(
          data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
        );
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
      } catch (error) {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchCountriesData();
  }, []);

  const toggleCountry = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "Nepal"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      });
  };

  return (
    <div className="App">
      {hasError ? (
        <p>Something went wrong</p>
      ) : isLoading ? (
        <p>Loading.....</p>
      ) : (
        <div className="app">
          <div className="app-left">
            <div className="header">
              <h1>COVID-19 TRACKER</h1>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select value={country} onChange={toggleCountry}>
                  <MenuItem value="Nepal">Nepal</MenuItem>
                  {countries.map((country) => (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="statistics">
              <Stats
              
                icon={<MdCoronavirus className="icon" />}
                title="Coronavirus Cases"
                cases={
                  countryInfo.todayCases ? (
                    <p>{numberWithCommas(countryInfo.todayCases)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
                total={
                  countryInfo.cases ? (
                    <p>{numberWithCommas(countryInfo.cases)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
              />
              <Stats
                icon={<GiHealthNormal className="icon" />}
                title="Recovered"
                total={
                  countryInfo.recovered ? (
                    <p>{numberWithCommas(countryInfo.recovered)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
                cases={
                  countryInfo.todayRecovered ? (
                    <p>{numberWithCommas(countryInfo.todayRecovered)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
              />
              <Stats
                icon={<GiDeathSkull className="icon" />}
                title="Deaths"
                total={
                  countryInfo.deaths ? (
                    <p>{numberWithCommas(countryInfo.deaths)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
                cases={
                  countryInfo.todayDeaths ? (
                    <p>{numberWithCommas(countryInfo.todayDeaths)}</p>
                  ) : (
                    <p>Data not updated</p>
                  )
                }
              />
            </div>
            <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} />
          </div>
          <div className="app-right">
            <Card className="app-right-card">
              <h3>Highest cases by country</h3>
              <CardContent className="card-content">
                <Table countries={tableData} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
