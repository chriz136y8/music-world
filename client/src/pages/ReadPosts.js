import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';
import './ReadPosts.css';

const ReadPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('Players')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching players:', error);
                } else {
                    setPosts(data || []);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);
    
    return (
        <div className="read-posts-container">
            <h2>Current Roster</h2>
            {loading ? (
                <div className="loading">Loading players...</div>
            ) : (
                <div className="ReadPosts">
                    {posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <Card 
                                key={post.id} 
                                id={post.id} 
                                player_name={post.player_name} 
                                team={post.team} 
                                position={post.position}
                                attributes={post.attributes || {}}
                            />
                        ))
                    ) : (
                        <div className="no-players">
                            <h3>No Players Yet 🥅</h3>
                            <p>Add your first player to start building your dream team!</p>
                        </div>
                    )}
                </div>
            )}
        </div>  
    );
};

export default ReadPosts;