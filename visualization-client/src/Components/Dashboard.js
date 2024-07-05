// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, TextField, Select, MenuItem, Button, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BarChart from './BarChart.js';
const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

const preprocessData = (data) => {
    return data.map(item => ({
        ...item,
        intensity: isNaN(item.intensity) ? 0 : Number(item.intensity),
    }));
};

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
      endYear: '',
      topics: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: ''
    });
  
    const [dropdownOptions, setDropdownOptions] = useState({
      endYears: [],
      topics: [],
      sectors: [],
      regions: [],
      pestles: [],
      sources: [],
      swots: [],
      countries: [],
      cities: []
    });
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios('http://localhost:5000/data');
        const processedData = preprocessData(result.data);
        setData(processedData);
  
        const uniqueValues = (key) => [...new Set(processedData.map(item => item[key]))];
  
        setDropdownOptions({
          endYears: uniqueValues('end_year'),
          topics: uniqueValues('topic'),
          sectors: uniqueValues('sector'),
          regions: uniqueValues('region'),
          pestles: uniqueValues('pestle'),
          sources: uniqueValues('source'),
          swots: uniqueValues('swot'),
          countries: uniqueValues('country'),
          cities: uniqueValues('city')
        });
      };
      fetchData();
    }, []);
  
    const handleFilterChange = (e) => {
      setFilters({
        ...filters,
        [e.target.name]: e.target.value
      });
    };
  
    const applyFilters = () => {
      const filtered = data.filter(item => {
        return (
          (filters.endYear ? item.end_year === filters.endYear : true) &&
          (filters.topics ? item.topic.includes(filters.topics) : true) &&
          (filters.sector ? item.sector === filters.sector : true) &&
          (filters.region ? item.region === filters.region : true) &&
          (filters.pestle ? item.pestle === filters.pestle : true) &&
          (filters.source ? item.source === filters.source : true) &&
          (filters.swot ? item.swot === filters.swot : true) &&
          (filters.country ? item.country === filters.country : true) &&
          (filters.city ? item.city === filters.city : true)
        );
      });
      setFilters(filtered);
    };
  
    const filteredData = data.filter(item => {
      return (
        (filters.endYear ? item.end_year === filters.endYear : true) &&
        (filters.topics ? item.topic.includes(filters.topics) : true) &&
        (filters.sector ? item.sector === filters.sector : true) &&
        (filters.region ? item.region === filters.region : true) &&
        (filters.pestle ? item.pestle === filters.pestle : true) &&
        (filters.source ? item.source === filters.source : true) &&
        (filters.swot ? item.swot === filters.swot : true) &&
        (filters.country ? item.country === filters.country : true) &&
        (filters.city ? item.city === filters.city : true)
      );
    })

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <Grid container spacing={3} style={{marginTop:"20px"}}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Dashboard Filters</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="End Year"
                        name="endYear"
                        value={filters.endYear}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.endYears.map((year) => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="Topics"
                        name="topics" 
                        value={filters.topics}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.topics.map((topic) => (
                          <MenuItem key={topic} value={topic}>{topic}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="Sector"
                        name="sector"
                        value={filters.sector}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.sectors.map((sector) => (
                          <MenuItem key={sector} value={sector}>{sector}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="Region"
                        name="region"
                        value={filters.region}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.regions.map((region) => (
                          <MenuItem key={region} value={region}>{region}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="PEST"
                        name="pestle"
                        value={filters.pestle}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.pestles.map((pestle) => (
                          <MenuItem key={pestle} value={pestle}>{pestle}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="Source"
                        name="source"
                        value={filters.source}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.sources.map((source) => (
                          <MenuItem key={source} value={source}>{source}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="SWOT"
                        name="swot"
                        value={filters.swot}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.swots.map((swot) => (
                          <MenuItem key={swot} value={swot}>{swot}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="Country"
                        name="country"
                        value={filters.country}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.countries.map((country) => (
                          <MenuItem key={country} value={country}>{country}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        select
                        label="City"
                        name="city"
                        value={filters.city}
                        onChange={handleFilterChange}
                        fullWidth
                        margin="normal"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {dropdownOptions.cities.map((city) => (
                          <MenuItem key={city} value={city}>{city}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Button variant="contained" color="primary" onClick={applyFilters} style={{ marginTop: '20px' }}>
                    Apply Filters
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5">Dashboard Visualizations</Typography>
                  <BarChart data={filteredData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    );
};

export default Dashboard;
