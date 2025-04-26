import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

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
                setPost(data);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        setLoadingComments(true);
        try {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', id)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                setComments(data || []);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoadingComments(false);
        }
    };

    const upvotePost = async () => {
        if (!post) return;
        
        try {
            const { error } = await supabase
                .from('Posts')
                .update({ upvotes: post.upvotes + 1 })
                .eq('id', id);

            if (error) {
                throw error;
            }

            // Update local state
            setPost({ ...post, upvotes: post.upvotes + 1 });
        } catch (error) {
            console.error('Error upvoting post:', error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        
        if (!comment.trim()) {
            alert('Comment cannot be empty');
            return;
        }

        try {
            const { data, error } = await supabase
                .from('Comments')
                .insert({
                    post_id: id,
                    content: comment,
                    created_at: new Date().toISOString()
                })
                .select();

            if (error) {
                throw error;
            }

            // Clear comment input and refresh comments
            setComment('');
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error.message);
            alert('Failed to add comment. Please try again.');
        }
    };

    const deletePost = async () => {
        if (!post) return;

        if (window.confirm("Are you sure you want to delete this recommendation?")) {
            try {
                // First delete all comments associated with this post
                await supabase
                    .from('Comments')
                    .delete()
                    .eq('post_id', id);

                // Then delete the post
                const { error } = await supabase
                    .from('Posts')
                    .delete()
                    .eq('id', id);

                if (error) {
                    throw error;
                }

                // Redirect to home page
                window.location = '/';
            } catch (error) {
                console.error('Error deleting post:', error.message);
                alert('Failed to delete recommendation. Please try again.');
            }
        }
    };

    // Format the date for display
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return <div className="loading">Loading recommendation...</div>;
    }

    if (!post) {
        return <div className="error">Recommendation not found</div>;
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail">
                <div className="post-header">
                    {post.imageUrl && (
                        <img 
                            className="post-detail-image" 
                            src={post.imageUrl} 
                            alt={post.title} 
                        />
                    )}
                    <h1 className="post-detail-title">{post.title}</h1>
                </div>

                <div className="post-meta">
                    <div className="post-date">Posted on: {formatDate(post.created_at)}</div>
                    <div className="post-upvotes">
                        <button className="upvote-button" onClick={upvotePost}>
                            👍 Upvote ({post.upvotes})
                        </button>
                    </div>
                </div>

                {post.content && (
                    <div className="post-body">
                        <h3>Artist Info/ Song Recommendations:</h3>
                        <p>{post.content}</p>
                    </div>
                )}

                <div className="post-actions">
                    <Link to={`/edit/${post.id}`} className="edit-button">Edit</Link>
                    <button className="delete-button" onClick={deletePost}>Delete</button>
                </div>

                <div className="comments-section">
                    <h3>Add a comment:</h3>
                    
                    <form className="comment-form" onSubmit={addComment}>
                        <textarea
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                        <button type="submit">Post Comment</button>
                    </form>

                    <br></br>
                    <h3>Comments:</h3>
                    {loadingComments ? (
                        <div className="loading-comments">Loading comments...</div>
                    ) : (
                        <div className="comments-list">
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <div key={comment.id} className="comment">
                                        <div className="comment-content">{comment.content}</div>
                                        <div className="comment-date">{formatDate(comment.created_at)}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-comments">
                                    <p>No comments yet. Be the first to comment!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostDetail;