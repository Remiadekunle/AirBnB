import { useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { useDispatch, useSelector } from "react-redux"
import { CloseModalButton, useModal } from "../../context/Modal"
import { deleteBooking, fetchUserBookings, removeBooking, updateBooking } from "../../store/booking"

function ViewReservations({spot}){
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)
    const { closeModal } = useModal();
    useEffect(() => {
        dispatch(fetchUserBookings())
    }, [dispatch])
    const userBookings = useSelector(state => state.bookings.user)
    const bookingsObj = useSelector(state => state.bookings.spot)
    if (! userBookings) return null
    const bookings = Object?.values(userBookings)
    const filterd = bookings.filter(booking => booking.spotId === spot.id)
    console.log('did we get anything useful?', filterd)
    if (filterd.length - count < 1){
        return(
            <div style={{padding: '30px', width: '800px', height: '500px'}}>
                <h2 style={{width: '100%', display: 'flex', justifyContent: 'center', fontSize: '32px', marginBottom: '40px'}}>
                    Welcome to {spot.name}
                </h2>
                <div style={{width: '100%', display: 'flex', fontSize: '24px', marginBottom: '20px'}}>
                    Your Bookings:
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65%'}}>
                    No Reservations for this spot
                </div>
            </div>
        )
    }
    // const userBookings =
    return(
        <div className="view-reservations-container" >
            <h2 style={{width: '100%', display: 'flex', fontSize: '32px', marginBottom: '20px'}}>
                Welcome to {spot.name}
            </h2>

            <div style={{width: '100%', display: 'flex', fontSize: '24px', marginBottom: '20px'}}>
                Your Bookings:
            </div>
            <div style={{margin: '0 auto', width: '65%'}}>
                {filterd && filterd.map(booking => (
                    <BookingIndex setCount={setCount} count={count} booking={booking} />
                ))}
            </div>
        </div>
    )
}

export default ViewReservations


export function BookingIndex({booking, setCount, count}){
    const dispatch = useDispatch();
    const {startDate, endDate} = booking
    const start = new Date(startDate)
    const end = new Date(endDate)
    const [dates, setDates] = useState([start, end])
    const [errors, setErrors] = useState([])
    const [display, setDisplay] = useState(false)
    const { closeModal } = useModal();

    useEffect(() => {
        let check = new Date(endDate) < new Date() ?  setCount(count + 1) : ''
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(removeBooking(booking.id)).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) return setErrors(Object.values(data.errors));
        })
        // await dispatch(fetchUserBookings())
    }

    const handeEdit = async (e) => {
        e.preventDefault();

        const [startDate, endDate] = dates
        const startList = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()]
        const endList = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()]
        await dispatch(updateBooking(booking.id, startList.join('-'), endList.join('-'))).then(() => closeModal()).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) return setErrors(Object.values(data.errors));
        });
    }
    const toggleDisplay = () => {
        setDisplay(!display)
    }

    return(
        <div style={{display: new Date(endDate) < new Date() ? 'none': 'flex', gap: '10px', width: '100%'}}>
            <div>

            </div>
            <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
                <div>
                    {errors.map(error => (
                        <div>
                            {error}
                        </div>
                    ))}
                </div>
                <div style={{display: 'flex', width: '100%'}}>
                    <div style={{display: 'flex', width: '30%', flexDirection: 'column'}}>
                        <div>
                            From:
                        </div>
                        {new Date(booking.startDate).toDateString()}
                    </div>
                    <div style={{display: 'flex', width: '30%', flexDirection: 'column'}}>
                        <div>
                            To:
                        </div>
                        {new Date(booking.endDate).toDateString()}
                    </div>

                </div>
                {display ? <div>
                    <Calendar  className={'spot-reserve-booking-calendar'} defaultValue={dates}  selectRange={true} minDate={new Date()} onChange={setDates}  />
                    <div style={{display: 'flex', width: '70%', marginLeft: '20%', marginBottom: '20px'}}>
                        <button className='bookings-submit-buttons' onClick={handeEdit}>Submit Booking</button>
                    </div>
                </div> : <></>}
                <div>
                    <button className="bookings-submit-buttons" onClick={() => {
                        toggleDisplay()
                        if (display) setErrors([])
                    }
                    }>{display ? 'Cancel' : 'Edit Booking'}</button>
                    <button className="bookings-submit-buttons" onClick={handleSubmit}>Delete Booking</button>
                </div>

            </div>
        </div>
    )
}
