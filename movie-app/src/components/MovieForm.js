import React, { useState } from 'react';
import './MovieForm.css';

const MovieForm = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    releaseDate: '',
    rating: '',
    genre: '',
    studioEmail: '',
  });

  const [formError, setFormError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError(null); // Reset form error on each submission attempt

    fetch('http://localhost:3001/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          // handle validation errors
          return response.json().then((data) => {
            throw new Error(data.errors && data.errors.length > 0 ? data.errors[0].msg : 'Submission failed.');
          });
        }
        return response.json();
      })
      .then((data) => {
        onSubmitSuccess();
      })
      .catch((error) => {
        setFormError(error.message);
      });
  };

  return (
    <form onSubmit={handleFormSubmit} className="movie-form">
      <div className="form-group">
        <label htmlFor="title">Movie Title: </label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="releaseDate">Date of Release: </label>
        <input type="date" id="releaseDate" name="releaseDate" value={formData.releaseDate} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="rating">Movie Rating (out of 10): </label>
        <input type="number" id="rating" step="any" name="rating" value={formData.rating} onChange={handleChange} min="0" max="10" required />
      </div>
      <div className="form-group">
        <label htmlFor="genre">Genre: </label>
        <select id="genre" name="genre" value={formData.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          <option value="Action">Action</option>
          <option value="Animation">Animation</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Historical">Historical</option>
          <option value="Horror">Horror</option>
          <option value="Sci Fi">Sci Fi</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="studioEmail">Movie Studio Email Address: </label>
        <input type="email" id="studioEmail" name="studioEmail" value={formData.studioEmail} onChange={handleChange} required />
      </div>
      {formError && <p className="error-message">{formError}</p>}
      <div className="form-group submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default MovieForm;
