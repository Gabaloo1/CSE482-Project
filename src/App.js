import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import React from 'react';
import './App.css';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import SimilarMovies from "./pages/SimilarMovies";
import PersonalizedRecommendations from "./pages/PersonalizedRecommendations";
import { useAuth } from './contexts/AuthContext';
import MovieRecommendationsResult from "./pages/MovieRecommendationResult"

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route exact path="/similar-movies" element={<ProtectedRoute><SimilarMovies/></ProtectedRoute>}/>
        <Route exact path="/personalized-recommendations" element={<ProtectedRoute><PersonalizedRecommendations/></ProtectedRoute>}/>
        <Route exact path="/movie-recommendations-result" element={<ProtectedRoute><MovieRecommendationsResult/></ProtectedRoute>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
