import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostDetail from './pages/PostDetail';
import { Link } from 'react-router-dom';

const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts />
    },
    {
      path: "/edit/:id",
      element: <EditPost />
    },
    {
      path: "/new",
      element: <CreatePost />
    },
    {
      path: "/post/:id",
      element: <PostDetail />
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>🎵 Music World</h1>
        <div className="nav-buttons">
          <Link to="/"><button className="headerBtn">Home</button></Link>
          <Link to="/new"><button className="headerBtn">Recommend Artist</button></Link>
        </div>
      </div>
      {element}
    </div>
  );
}

export default App;