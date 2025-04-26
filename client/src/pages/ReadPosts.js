import React, { useState, useEffect } from 'react';
import Post from './Post';
import { supabase } from '../client';
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('created_at');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
    }, [sortBy]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('Posts')
                .select('*');
            
            // Apply sorting
            if (sortBy === 'created_at') {
                query = query.order('created_at', { ascending: false });
            } else if (sortBy === 'upvotes') {
                query = query.order('upvotes', { ascending: false });
            }

            const { data, error } = await query;

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter posts based on search term
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="read-posts-container">
            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by artist name..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-groups">
                    <div className="filter-group">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            className="filter-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="created_at">Newest First</option>
                            <option value="upvotes">Most Upvoted</option>
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading recommendations...</div>
            ) : (
                <div className="posts-grid">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                imageUrl={post.imageUrl}
                                upvotes={post.upvotes}
                                created_at={post.created_at}
                            />
                        ))
                    ) : (
                        <div className="no-posts">
                            <h3>No Music Recommendations Yet 🎧</h3>
                            <p>Be the first to recommend an artist!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReadPosts;