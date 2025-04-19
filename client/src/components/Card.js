import React from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'

const Card = (props) => {
  return (
    <div className="Card">
      <Link to={`/edit/${props.id}`}><img className="moreButton" alt="edit button" src={more} /></Link>
      <Link to={`/player/${props.id}`} className="card-link">
        <img className="player-avatar" width={200} src='https://imgs.search.brave.com/HGuyqjtwfhbS7N0UV8is0kHzFh1m6fMHjigMYWNEfkI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM2Lzky/LzgxLzM2OTI4MTA1/ZmZjOGU5MmU3MWVi/ZGZiODUwMjJhZWE2/LmpwZw' alt={props.player_name}></img>
        <h2 className="player_name">{props.player_name}</h2>
        <h3 className="team">{props.team}</h3>
        <p className="position">{props.position}</p>
      </Link>
    </div>
  );
};

export default Card;