import React from 'react';
import { useState } from 'react';
import { supabase } from '../client'
import './CreatePost.css'

const CreatePost = () => {

    const [post, setPost] = useState({player_name: "", team: "", position: ""})
    const teamOptions = [
        "Washington Capitals", 
        "Pittsburgh Penguins", 
        "Boston Bruins", 
        "Toronto Maple Leafs",
        "New York Rangers",
        "Montreal Canadiens"
      ];

      const positionOptions = ["Center", "Left Wing", "Right Wing", "Defense", "Goalie"];

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Players')
          .insert({player_name: post.player_name, team: post.team, position: post.position})
          .select();
      
        window.location = "/";
      }
    

    return (
        <div>
            <form>
                <label for="player_name">Player Name</label> <br />
                <input type="text" id="player_name" name="player_name" onChange={handleChange} /><br />
                <br/>

                
                <label>Team</label>
                
                    {teamOptions.map((team) => (
                    <button
                        key={team}
                        type="button"
                        className={`option-btn ${post.team === team ? 'selected' : ''}`}
                        onClick={() => setPost({...post, team: team})}
                    >
                        {team}
                    </button>
                    ))}
          
                <br/>

                <div className="form-group">
                    <label>Position</label>
                    <div className="option-buttons">
                        {positionOptions.map((position) => (
                            <button
                                key={position}
                                type="button"
                                className={`option-btn ${post.position === position ? 'selected' : ''}`}
                                onClick={() => setPost({...post, position: position})}
                            >
                                {position}
                            </button>
                        ))}
                    </div>
                </div>

                <br/>
                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost