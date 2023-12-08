import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './MovieList.css';

const MovieList = ({ refreshList }) => {
  const [movies, setMovies] = useState([]);
  
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    // convert unix time to date string
    const date = Date(dateString);
    // create new date object and format to mm/dd/yyyy format
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    // Fetch the list of movies from the backend when the component mounts
    fetch('http://localhost:3001/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error.message));
  }, [refreshList]);

  return (
    <div className="movie-list-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date of Release</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Genre</TableCell>
              <TableCell>Studio Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{formatDate(movie.releaseDate)}</TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.genre}</TableCell>
                <TableCell>{movie.studioEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MovieList;
