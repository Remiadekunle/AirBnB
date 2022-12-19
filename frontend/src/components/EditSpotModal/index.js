import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";

import './index.css';

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


  useEffect(() => {
    let newErrors = []

    if (price < 1) newErrors.push('Price needs to be greater than $0')
    if (description.length < 50) newErrors.push('Description needs to be atleast 50 chars')
    if (name.length < 1) newErrors.push('Name must be atleast 1 char')

    setErrors(newErrors)
  }, [address, city, state, country, name, description, price])


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


    await dispatch(updateSpot(payload, spot)).then(closeModal).catch(async (res) => {
        console.log('this is res',res)
        const data = await res.json();
        if (data && data.errors) setErrors(Object.values(data.errors));
      });

    // history.push(`/spots/${spot.id}`)
    // history.push(`/`)

  };

  return (
    <>
      <h1>Edit Spot</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <div className="form-spot-details">
            Spot Details
          </div>
          <input
            type="text"
            name="address"
            defaultValue={address}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Address"
          />
        </label>
        <label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            placeholder="City"
          />
        </label>
        <label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            placeholder="State"
          />
        </label>
        <label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            placeholder="Country"
          />
        </label>
        <label>

          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
        </label>
        <label>

          <input
            type="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
          />
        </label>
        <label>
          <div id="edit-price" >
            Price
          </div>
          <input
            type="name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditSpotModal;
