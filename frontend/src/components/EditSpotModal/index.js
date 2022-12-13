import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';

import { updateSpot } from '../../store/spots'

function EditSpotModal({spot}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const {id} = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    const lat = 1;
    const lng = 2;
    console.log(spot.id)
    const payload = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    }

    let errors;

    await dispatch(updateSpot(payload, spot.id)).then(closeModal)

    // .catch(async (res) => {
    //     console.log('this is res',res)
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
  };

  return (
    <>
      <h1>Edit Spot</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
            address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          city
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditSpotModal;
