import React, { useState } from 'react';
import { supabase } from '../client';
import './CreatePost.css';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageUrl: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const createPost = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!post.title.trim()) {
            alert("Artist name is required!");
            return;
        }

        try {
            const { data, error } = await supabase
                .from('Posts')
                .insert({
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    upvotes: 0, // Initialize upvotes to 0
                    created_at: new Date().toISOString()
                })
                .select();

            if (error) {
                throw error;
            }

            window.location = "/";
        } catch (error) {
            console.error('Error creating post:', error.message);
            alert('Failed to create recommendation. Please try again.');
        }
    };

    return (
        <div className="create-post-container">
            <h2>Recommend an Artist</h2>
            <form className="post-form">
                <div className="form-group">
                    <label htmlFor="title">Artist Name*</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Taylor Swift, The Beatles"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Artist Info/ Song Recommendations:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        placeholder="What makes this artist special? What songs would you recommend?"
                        rows="5"
                    />
                </div>

                <div className="form-group" > 
                    <label htmlFor="imageUrl">Artist Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={post.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/artist-image.jpg"
                    />
                </div>

                {post.imageUrl && (
                    <div className="image-preview">
                        <p >Image Preview:</p>
                        <img  width={300}  src={post.imageUrl} alt="Preview" />
                    </div>
                )}

                <div className="form-actions">
                    <button type="submit" onClick={createPost}>Submit Recommendation</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;