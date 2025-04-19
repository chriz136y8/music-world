import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import PlayerDetail from './pages/PlayerDetail';
import { Link } from 'react-router-dom'


const App = () => {
  
  const post = 'LW'

  const posts = [
      {'id':'1', 
      'player_name': 'Anthony Beauvillier',
      'team':'Washington Capitals', 
      'position': post},

      {'id':'2', 
        'player_name': 'Alexander Alexeyev',
        'team':'Washington Capitals', 
        'position': post},

        {'id':'3', 
          'player_name': 'Noel Acciari',
          'team':'Penguins', 
          'position': post},

          {'id':'4', 
            'player_name': 'Philip Tomasino',
            'team':'Penguins', 
            'position': post},
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    },
    {
      path:"/player/:id",
      element: <PlayerDetail />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>🏒 My Hockey Team</h1>
        <Link to="/"><button className="headerBtn"> Current Roster  </button></Link>
        <Link to="/new"><button className="headerBtn"> New Player </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
