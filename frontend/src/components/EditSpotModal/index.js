import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { CloseModalButton, useModal } from "../../context/Modal";

import './index.css';

import { updateSpot } from '../../store/spots'

function EditSpotModal({spot}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price)
  const [beds, setBeds] = useState(spot.beds)
  const [baths, setBaths] = useState(spot.baths)
  const [guests, setGuests] = useState(spot.guests)
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();


  useEffect(() => {
    let newErrors = []

    if (price < 1) newErrors.push('Price needs to be greater than $0')
    if (description.length < 50) newErrors.push('Description needs to be atleast 50 chars')
    if (name.length < 1) newErrors.push('Name must be atleast 1 char')
    if (country.trim().length !== 2) newErrors.push('Please enter the 2 digit country code')

    setErrors(newErrors)
  }, [address, city, state, country, name, description, price])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country.trim().length !== 2) return
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
        price,
        beds,
        baths,
        guests
    }

    const spotTranslate ={
      'locality': 'City',
      'route': 'Street Name',
      'street_number': 'Street Number',
      'country': 'Country',
      'administrative_area_level_1': 'State',
      'postal_code': 'Zip-code',
      'postal_code_suffix': 'Zipcode suffix',
      'point_of_interest': 'Street Name'
    }


    await dispatch(updateSpot(payload, spot)).then(closeModal).catch(async (res) => {
        console.log('this is res',res)
        const data = await res.json();
        if (data && data.errors?.inputs){
          const mapped = data.errors.inputs.map(input => spotTranslate[input])
          console.log('were almost there')
          setErrors([`The address you provided is invalid: ${mapped.join('/')}`])
          return false
        }
        if (data && data.errors) setErrors(Object.values(data.errors));
    });

    // history.push(`/spots/${spot.id}`)
    // history.push(`/`)

  };

  return (
    <>
      <h1>Edit Spot</h1>
      <form className="edit-form" onSubmit={handleSubmit}>
        <ul className="errors-list-container">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          <div className="form-spot-details">
            Spot Details
          </div>
          <input
            type="text"
            name="address"
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
        <label >
          <div id="create-price">
            Beds
          </div>
          <input
            type="number"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
            required
            // defaultValue={'none'}
            placeholder="Beds"
          />
        </label>
        <label >
          <div id="create-price">
            Baths
          </div>
          <input
            type="number"
            value={baths}
            onChange={(e) => setBaths(e.target.value)}
            required
            // defaultValue={'none'}
            placeholder="Baths"
          />
        </label>
        <label >
          <div id="create-price">
            Guests
          </div>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            required
            // defaultValue={'none'}
            placeholder="Guests"
          />
        </label>
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditSpotModal;
