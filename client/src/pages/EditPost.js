import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: "",
        content: "",
        imageUrl: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching post:', error);
                } else {
                    setPost({
                        id: data.id,
                        title: data.title || "",
                        content: data.content || "",
                        imageUrl: data.imageUrl || ""
                    });
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const updatePost = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!post.title.trim()) {
            alert("Artist name is required!");
            return;
        }

        try {
            const { error } = await supabase
                .from('Posts')
                .update({
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl
                })
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Redirect to post detail page
            window.location = `/post/${id}`;
        } catch (error) {
            console.error('Error updating post:', error.message);
            alert('Failed to update recommendation. Please try again.');
        }
    };

    if (loading) {
        return <div className="loading">Loading recommendation data...</div>;
    }

    return (
        <div className="edit-post-container">
            <h2>Edit Recommendation</h2>
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Why do you recommend this artist?</label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        rows="5"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Artist Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={post.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                {post.imageUrl && (
                    <div className="image-preview">
                        <p>Image Preview:</p>
                        <img src={post.imageUrl} alt="Preview" />
                    </div>
                )}

                <div className="form-actions">
                    <button type="submit" onClick={updatePost}>Update Recommendation</button>
                </div>
            </form>
        </div>
    );
};

export default EditPost;