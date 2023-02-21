import React, { useEffect, useState, useSelector } from "react";
import { useDispatch } from "react-redux";
import { CloseModalButton, useModal } from "../../context/Modal";
// import './SignupForm.css';
import { createSpot, fetchSpots } from '../../store/spots'
import './index.css';


function CreateSpotModal({setIsFiltered, sessionUser}) {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0)
  const [beds, setBeds] = useState(0)
  const [baths, setBaths] = useState(0)
  const [guests, setGuests] = useState(0)
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  // const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    let newErrors = []

    if (price < 1) newErrors.push('Price needs to be greater than $0')
    if (description.length < 50) newErrors.push('Description needs to be atleast 50 chars')
    if (name.length < 1) newErrors.push('Name must be atleast 1 char')
    if (country.trim().length !== 2) newErrors.push('Please enter the 2 digit country code')

    setErrors(newErrors)
  }, [address, city, state, country, name, description, price])

  if ( !sessionUser || Object?.values(sessionUser)?.length < 1) {
    return(
      <div>
        Please sign in
      </div>
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (country.trim().length !== 2) return
    setErrors([]);
    const lat = 1;
    const lng = 2;

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
    const payload2 = {
      url,
      preview: true
    }
    let errors;

    const spotTranslate ={
      'locality': 'City',
      'route': 'Street Name',
      'street_number': 'Street Number',
      'country': 'Country',
      'administrative_area_level_1': 'State',
      'postal_code': 'Zip-code',
      'postal_code_suffix': 'Zipcode suffix',
      'point_of_interest': 'Street Name',
      'premise': 'Street'
    }

    const check = await dispatch(createSpot(payload, payload2)).then(() => setIsFiltered(false)).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors?.inputs){
          const mapped = data.errors.inputs.map(input => spotTranslate[input])
          setErrors([`The address you provided is invalid: ${mapped.join('/')}`])
          return false
        }
        if (data && (data.errors || data.message)) {
          let errs = data.inputs ? data.inputs: []

          setErrors(Object.values(data.errors));
          return false
        }
    });
    await dispatch(fetchSpots())
    if (check === false) return
    return closeModal()

    // console.log('this is the errors', errors)
    // dispatch(sessionActions.signup({ address, city, state, country, name, price }))
    // .then(closeModal)
    // .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    // });

    // return setErrors(['Confirm name field must be the same as the name field']);
  };

  return (
    <>
      <h1>Create New Spot</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div id="welcome-message">
          Welcome to FairBnB
        </div>
        <ul className="errors-list-container">
          {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="create-label">
          <div className="form-spot-details">
            Spot Details
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="address-input first"
            autoFocus
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
            placeholder="name"
          />
        </label>
        <label >
          <input
            type="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description"
          />
        </label>
        <label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            placeholder="Url"
          />
        </label>
        <label >
          <input
            type="number"
            value={price ? price: 'price'}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            required
            min={1}
            // defaultValue={'none'}
            placeholder="Price"
          />
        </label>
        <label >
          <input
            type="number"
            value={beds ? beds: 'price'}
            onChange={(e) => setBeds(parseInt(e.target.value))}
            required
            min={1}
            placeholder="Beds"
            // defaultValue={'none'}
          />
        </label>
        <label >
          <input
            type="number"
            value={baths ? baths: 'price'}
            onChange={(e) => setBaths(parseInt(e.target.value))}
            required
            min={1}
            placeholder="Baths"
            // defaultValue={'none'}
          />
        </label>
        <label >
          <input
            type="number"
            value={guests ? guests: 'guests'}
            onChange={(e) => setGuests(parseInt(e.target.value))}
            required
            min={1}
            placeholder="Guests"
            className="address-input last"
            // defaultValue={'none'}
          />
        </label>
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateSpotModal;
