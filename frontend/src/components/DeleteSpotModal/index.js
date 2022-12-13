import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
// import './SignupForm.css';
import { removeSpot } from '../../store/spots'

function DeleteSpotModal({spot}) {
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
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        let errors;



        const res = await dispatch(removeSpot(spot)).then(closeModal).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
        // console.log('this is the errors', errors)
        console.log(res)
        history.push('/')

        // console.log('this is the spot', spot)
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

export default DeleteSpotModal;
