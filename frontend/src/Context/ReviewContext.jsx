import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

    // 🔹 Fetch reviews by userID
    const fetchReviewsByUser = async (userID) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/user/${userID}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching user reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Fetch reviews by productID
    const fetchReviewsByProduct = async (productID) => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/product/${productID}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching product reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Fetch all reviews (admin use)
    const fetchAllReviews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/api/reviews/`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setReviews(res.data);
        } catch (error) {
            console.error("Error fetching all reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Add a new review
    const addReview = async (reviewData) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/reviews/`, reviewData, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            setReviews((prev) => [res.data, ...prev]);
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                reviews,
                loading,
                fetchReviewsByUser,
                fetchReviewsByProduct,
                fetchAllReviews,
                addReview,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReviewContext = () => useContext(ReviewContext);