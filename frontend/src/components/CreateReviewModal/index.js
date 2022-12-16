import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';
import { createSpot } from '../../store/spots'

import {createReview} from '../../store/reviews'

function CreateReviewModal({spot, toggleReviewed}) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  if (!user){
    return (
        <div>
            Need to be loginIn
        </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const payload = {
        review,
        stars,
    }
    let errors;
    await dispatch(createReview(payload, spot.id, user)).then(closeModal).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });
    console.log('this is the errors', errors)
    toggleReviewed()
  };

  return (
    <>
      <h1>Create Review</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
            review
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="review-input"
          />
        </label>
        <label>
          stars
          <input
            type="text"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>

        <button className="submitButton" type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateReviewModal;
