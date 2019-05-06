const express = require("express");
const app = express();
const port = 3000;
const rp = require("request-promise");
const cors = require("cors");

app.use(cors());

app.get("/planets", (req, res) => {
  setImmediate(async () => {
    const fetchDataPromise = (url, countItems) => {
      const data = [];
      const countPage = Math.ceil(countItems / 10);
      for (let i = 1; i <= countPage; i++) {
        data.push(rp(`${url}?page=${i}`));
      }
      return data;
    };
    const convertPopulation = (value) => {
      if (value === "unknown") {
        return "-"
      }
      const thousand = 1000;
      const million = 1000000;
      const billion = 1000000000;
      const trillion = 1000000000000;
      if (value < thousand) {
        return String(value);
      }
      if (value >= thousand && value <= 1000000) {
        return  Math.round(value/thousand) + "k";
      }

      if (value >= million && value <= billion) {
        return Math.round(value/million) + "m";
      }

      if (value >= billion && value <= trillion) {
        return Math.round(value/billion) + "b";
      }

      else {
        return Math.round(value/trillion) + "t";
      }
    };
    const planetsPromise = fetchDataPromise("https://swapi.co/api/planets", 61);
    const peoplePromise = fetchDataPromise("https://swapi.co/api/people", 87);
    const filmsPromise = fetchDataPromise("https://swapi.co/api/films", 7);
    const planets = await Promise.all(planetsPromise);
    const people = await Promise.all(peoplePromise);
    const resultsOfPeople = [];
    let films = await Promise.all(filmsPromise);
    people.forEach(page => {
      const obj = JSON.parse(page);
      resultsOfPeople.push(...obj.results);
    });
    const resultsOfFilms = [];
    films.forEach(page => {
      const obj = JSON.parse(page);
      resultsOfFilms.push(...obj.results);
    });
    const resultsOfPlanets = [];
    planets.map(item => {
      const parsedItem = JSON.parse(item);
      parsedItem.results.map(planet => {
        planet.population = convertPopulation(planet.population);
        planet.filmsAmount = planet.films.length;
        planet.films = planet.films.map(url => {
          return resultsOfFilms.find(film => film.url === url)
        });
        planet.residentsAmount = planet.residents.length;
        planet.residents = planet.residents.map(url => {
          return resultsOfPeople.find(person => person.url === url)
        });
        resultsOfPlanets.push(planet)
      })
    });
    res.status(200).send(resultsOfPlanets);
  });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err)
  }

  console.log(`server is listening on ${port}`)
});
