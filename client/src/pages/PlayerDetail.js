import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './PlayerDetail.css';

const PlayerDetail = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      // Extract the numeric ID from the parameter (removes 'player/:id' prefix)
      const playerId = id.replace('player/:id', '');
      
      const { data, error } = await supabase
        .from('Players')
        .select('*')
        .eq('id', playerId)
        .single();

      if (error) {
        console.error('Error fetching player:', error);
      } else {
        setPlayer(data);
      }
      setLoading(false);
    };

    fetchPlayer();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading player data...</div>;
  }

  if (!player) {
    return <div className="error">Player not found</div>;
  }

  return (
    <div className="player-detail">
      <div className="player-profile">
        <img 
          className="player-image" 
          src="https://imgs.search.brave.com/HGuyqjtwfhbS7N0UV8is0kHzFh1m6fMHjigMYWNEfkI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzM2Lzky/LzgxLzM2OTI4MTA1/ZmZjOGU5MmU3MWVi/ZGZiODUwMjJhZWE2/LmpwZw" 
          alt={`${player.player_name}`} 
        />
        <h1 className="player-name">{player.player_name}</h1>
        <div className="player-info">
          <div className="info-row">
            <span className="info-label">Team:</span>
            <span className="info-value">{player.team}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Position:</span>
            <span className="info-value">{player.position}</span>
          </div>
          
          {/* Additional player stats could be displayed here */}
          <div className="info-row">
            <span className="info-label">Jersey Number:</span>
            <span className="info-value">{player.id}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Experience:</span>
            <span className="info-value">Professional</span>
          </div>
        </div>
      </div>
      <div className="action-buttons">
        <Link to={`/edit/${player.id}`} className="edit-button">Edit Player</Link>
        
      </div>
    </div>
  );
};

export default PlayerDetail;