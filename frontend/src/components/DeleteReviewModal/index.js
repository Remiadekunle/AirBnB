import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';
import { removeSpot } from '../../store/spots'
import {removeReview} from '../../store/reviews'


function DeleteReviewModal({spot, reviews, user, setReviewdd}) {
    const dispatch = useDispatch();

    const [country, setCountry] = useState("");
    const userId = user.id
    console.log('finding the user', userId)
    const review = reviews.find(review => {
        const reviewer = review.user

        return review.userId === +userId
    })

    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();
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



    };

    return (
        <>
        <h1>Delete Spot</h1>
        <form onSubmit={handleSubmit}>
            <ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
            Are you sure you want to delete?
            <input
                type="checkbox"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
            />
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

export default DeleteReviewModal;
