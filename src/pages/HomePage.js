import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {query, getDocs, collection, where, doc, updateDoc} from "firebase/firestore";
import {db} from "../firebaseConfig"
import { useAuth } from '../contexts/AuthContext';


const RECOMMENDATION_OPTIONS = {
    none: "none",
    userBase: "userBase",
    movieBase: "movieBase"
}

export default function HomePage() {
    const navigate = useNavigate();
    const auth = getAuth();
    const [recommendationOption, setRecommendationOption] = useState(RECOMMENDATION_OPTIONS.none);
    const { currentUser, logOut } = useAuth();

    useEffect(() => {
        console.log("here");
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("here 2");
            if (!user) {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    // Logout handler
    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout Failed:', error);
        }
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <section className='main-content'>
            <div className="buttons-container">
                <button onClick={handleLogout} className="logout-button">Log Out</button>
            </div>
            <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
            <div className="absolute w-[80vw] bg-black text-white flex flex-col z-30 p-3 h-[80vh] justify-center items-center"> 
                <h1 style={{ fontSize: '250%', fontWeight: 'bold', margin: '5%', color: '#fff', textShadow: `0 0 7px rgba(162, 0, 255, 0.8), 0 0 10px rgba(162, 0, 255, 0.8), 0 0 21px rgba(162, 0, 255, 0.8), 0 0 42px rgba(162, 0, 255, 0.8), 0 0 82px rgba(162, 0, 255, 0.8), 0 0 92px rgba(162, 0, 255, 0.8), 0 0 102px rgba(162, 0, 255, 0.8), 0 0 151px rgba(162, 0, 255, 0.8)` }}>
                    Welcome, {currentUser ? `${currentUser.displayName}` : "User"}
                </h1>
                <button onClick={() => navigate("/similar-movies")} className='logout-button' style={{ marginBottom: '10px' }}>
                    Recommendations from your favorite movies
                </button>
                <button onClick={() => navigate("/personalized-recommendations")} className='logout-button' style={{ marginBottom: '10px' }}>
                    Personalized recommendations
                </button>
            </div> 
            
        </section>
  )
}
