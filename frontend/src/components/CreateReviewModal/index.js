import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';
import './index.css';
import {createReview, setReviewed} from '../../store/reviews'


function CreateReviewModal({spot, toggleReviewed}) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    let newErrors = []

    if (review.split(' ').length < 2) newErrors.push('Review must be atleast 2 words')

    setErrors(newErrors)
  }, [review, stars])

  if ( !user || Object?.values(user)?.length < 1) {
    return(
      <div>
        Please sign in
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
    dispatch(setReviewed())
    toggleReviewed()
  };

  return (
    <>
      <h1>Create Review</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="review-input"
            placeholder="Review"
          />
        </label>
        <label>
          <input
            type="text"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            placeholder="Stars"
          />
        </label>

        <button className="submitButton" type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateReviewModal;
