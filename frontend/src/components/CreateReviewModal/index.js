import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseModalButton, useModal } from "../../context/Modal";
// import './SignupForm.css';
import './index.css';
import {createReview, setReviewed} from '../../store/reviews'


function CreateReviewModal({spot, toggleReviewed}) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
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
    dispatch(setReviewed())
    toggleReviewed()
  };

  return (
    <>
      <h1>Create Review</h1>
      <form className="create-reviews-form" onSubmit={handleSubmit}>
        <ul className="errors-list-container">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
            min={1}
            max={5}
            placeholder="Stars"
            className="review-input"
          />
        </label>
        <label>
          <textarea
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="review-input"
            placeholder="Review"
            rows={'5'}
          />
        </label>
        <div style={{width: '100%', justifyContent: 'center', display: 'flex'}}>
          <button className="submitButton reviews-submit" type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default CreateReviewModal;
