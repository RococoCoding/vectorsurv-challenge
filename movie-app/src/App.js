import React, { useState } from 'react';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './App.css';

const App = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefreshList = () => {
    // Toggle the state to trigger a re-render of MovieList
    setRefreshList((prev) => !prev);
  };

  return (
    <div className="App">
      <h1 className="Title">Favorite Movies App</h1>
      <MovieForm onSubmitSuccess={handleRefreshList} />
      <MovieList key={refreshList} />
    </div>
  );
};

export default App;
