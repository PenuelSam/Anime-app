import React, { useEffect, useState } from "react";

function App() {

  const [query, setQuery] = useState("");
  const [anime, setAnime] = useState([]);

  
  const animeDb = async (title) => {
    const response = await fetch(`https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=+${title}`, {
      "method": 'GET',
      "headers": {
        'X-RapidAPI-Key': process.env.REACT_APP_ANIME_KEY,
        'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
      }
    })
  const data = await response.json()
  setAnime(data.data)
    
  }

  useEffect(() => {
    animeDb("Fullmetal")
  },[])

  const searchAnime = (e) => {
    setQuery(e.target.value)
  }

  const clickHandler = (e) => {
    e.preventDefault();
    animeDb(query)
  }

  return (
    <div className="app">
      <h1>ANIME-APP</h1>
      <form>
        <input type="text" value={query} placeholder="search for your favourite anime" onChange={searchAnime} />
        <button className="button" onClick={clickHandler }>Search</button>
      </form>
      <div  className='image-container'>
      {anime.map((ani,index) => (
          <div key={index} className="image-card">
          <img src={ani.image} alt={ani.title} />
          <h2>{ani.title}</h2>
          </div>
      ))}
      </div>
    </div>
  );
}

export default App;
