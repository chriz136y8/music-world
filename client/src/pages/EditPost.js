import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client'
import './EditPost.css'

const EditPost = (props) => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, player_name: "", team: "", position: "" });
    const [loading, setLoading] = useState(true);
    
    const teamOptions = [
        "Washington Capitals", 
        "Pittsburgh Penguins", 
        "Boston Bruins", 
        "Toronto Maple Leafs",
        "New York Rangers",
        "Montreal Canadiens"
    ];
    
    const positionOptions = ["Center", "Left Wing", "Right Wing", "Defense", "Goalie"];

    // Fetch the current player data when component mounts
    useEffect(() => {
        const fetchPlayer = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('Players')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching player:', error);
                } else {
                    setPost({
                        id: data.id,
                        player_name: data.player_name || "",
                        team: data.team || "",
                        position: data.position || ""
                    });
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlayer();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    const updatePost = async (event) => {
        event.preventDefault();
      
        await supabase
            .from('Players')
            .update({ player_name: post.player_name, team: post.team, position: post.position })
            .eq('id', id);
      
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
        
        if (window.confirm("Are you sure you want to delete this player?")) {
            await supabase
                .from('Players')
                .delete()
                .eq('id', id);
                    
            window.location = "/";
        }
    }

    if (loading) {
        return <div className="loading">Loading player data...</div>;
    }

    return (
        <div className="edit-post-container">
            <h2>Edit Player</h2>
            <form className="player-form">
                <div className="form-group">
                    <label htmlFor="player_name">Player Name</label>
                    <input 
                        type="text" 
                        id="player_name" 
                        name="player_name" 
                        value={post.player_name} 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Team</label>
                    <div className="option-buttons">
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
                    </div>
                </div>

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
                
                <div className="form-actions">
                    <input type="submit" value="Update Player" onClick={updatePost}/>
                    <button className="deleteButton" onClick={deletePost}>Delete Player</button>
                </div>
            </form>
        </div>
    )
}

export default EditPost