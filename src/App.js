import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/CovidMap';
import Table from './components/Table';
import {sortData} from './utils';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';

function App () {
  const [countryCode, setcountryCode] = useState('');
  const [countries, setCountries] = useState ([]);
  const [country, setCountry] = useState ('worldwide');
  const [countryInfo, setCountryInfo] = useState ({});
  const [tableData, setTableData] = useState ([]);
  const [mapCenter, setMapCenter] = useState ({
    lat: 10,
    lng: 27.01,
  });
  const [mapZoom, setMapZoom] = useState (3);
  useEffect (() => {
    fetch ('https://disease.sh/v3/covid-19/all')
      .then (res => res.json ())
      .then (data => {
        setCountryInfo (data);
      });
  }, []);

  useEffect (() => {
    const fetchCountries = () => {
      fetch ('https://disease.sh/v3/covid-19/countries')
        .then (res => res.json ())
        .then (data => {
          const countries = data.map (country => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData (data);

          setTableData (sortedData);

          setCountries (countries);
        });
    };
    fetchCountries ();
  }, []);

  const changeOption = async e => {
    const countryCode = e.target.value;

    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

      

    await fetch (url).then (res => res.json ()).then (data => {
      setCountry (countryCode);
      setCountryInfo (data);
      setMapCenter ([
        parseInt (data.countryInfo.lat),
        parseInt (data.countryInfo.long),
      ]);
      setMapZoom (4);
    });
  };

  return (
    <div className="app">

      <div className="app-left">

        <div className="app-header">
          <h1>COVID-19 Tracker</h1>

          <FormControl className="app-dropdown col-sm-3">
            <Select
              className="form-select"
              value={country}
              onChange={changeOption}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map (country => (
                <MenuItem value={country.value}>
                  {country.name}<br />
                </MenuItem>
              ))}

            </Select>
          </FormControl>

        </div>

        <div className="app-states">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />

        </div>

        {/* <Map center={mapCenter} zoom={mapZoom} /> */}
        <LineGraph  country={country}/>

      </div>

      <Card className="app-right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          {/* <h3>World Wide New Cases</h3>
          <LineGraph /> */}
        </CardContent>

      </Card>

    </div>
  );
}

export default App;
