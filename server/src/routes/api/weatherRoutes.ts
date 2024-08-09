import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const city = req.body.cityName
  // TODO: GET weather data from city name
  const weather = new WeatherService(city)
  res.send(await weather.getWeatherForCity())
  // TODO: save city to search history
  HistoryService.addCity(city)
  res.json()
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  const cities = await HistoryService.getCities()
  res.send(cities)
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  HistoryService.removeCity(req.params.id)
  const cities = await HistoryService.getCities()
  res.send(cities)
});

export default router;
