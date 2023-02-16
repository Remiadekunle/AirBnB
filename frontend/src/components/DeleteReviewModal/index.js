import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';

import {removeReview, setReviewedFalse} from '../../store/reviews'
import './index.css';

function DeleteReviewModal({spot, reviews, user, toggleReviewed}) {
    const dispatch = useDispatch();

    const [country, setCountry] = useState("");
    const userId = user?.id
    console.log('finding the user', userId)
    const review = reviews.find(review => {
        return review.userId === +userId
    })

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        let errors;

        console.log(review)
        console.log('this is a test', user.id,)
        const res = await dispatch(removeReview(spot.id, review)).then(closeModal).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        // console.log('this is the errors', errors)
        // console.log(res)
        toggleReviewed()
        dispatch(setReviewedFalse())

    };

    return (
        <>
        <h1>Delete Spot</h1>
        <form onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className="delete-label">
            Are you sure you want to delete?
            <input
                type="checkbox"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
            </label>
            <button className="submitButton" type="submit">Submit</button>
        </form>
        </>
    );
}

export default DeleteReviewModal;
