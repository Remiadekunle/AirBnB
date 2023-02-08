import { useEffect, useState } from "react"
import { Calendar } from "react-calendar"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteBooking, fetchUserBookings, removeBooking, updateBooking } from "../../store/booking"

function ViewReservations({spot}){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchUserBookings())
    }, [dispatch])
    const userBookings = useSelector(state => state.bookings.user)
    const bookingsObj = useSelector(state => state.bookings.spot)
    if (! userBookings) return null
    const bookings = Object?.values(userBookings)
    const filterd = bookings.filter(booking => booking.spotId === spot.id)
    console.log('did we get anything useful?', filterd)
    if (filterd.length < 1){
        return(
            <div style={{width: '250px', height: '200px'}}>
                No Reservations for this spot
            </div>
        )
    }
    // const userBookings =
    return(
        <div style={{padding: '30px', width: '800px'}}>
            {filterd && filterd.map(booking => (
                <BookingIndex booking={booking} />
            ))}
        </div>
    )
}

export default ViewReservations


export function BookingIndex({booking}){
    const dispatch = useDispatch();
    const {startDate, endDate} = booking
    const start = new Date(startDate)
    const end = new Date(endDate)
    const [dates, setDates] = useState([start, end])
    const [errors, setErrors] = useState([])
    const [display, setDisplay] = useState(false)
    const { closeModal } = useModal();
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
        <div style={{display: 'flex', gap: '10px'}}>
            <div>
                {errors.map(error => (
                    <div>
                        {error}
                    </div>
                ))}
            </div>
            <div>
                From:
                {booking.startDate}
            </div>
            <div>
                To:
                {booking.endDate}
            </div>
            {display ? <div>
                <Calendar  className={'spot-reserve-booking-calendar'} defaultValue={dates}  selectRange={true} minDate={new Date()} onChange={setDates}  />
                <button onClick={handeEdit}>Submit Booking</button>
            </div> : <></>}

            <button onClick={toggleDisplay}>{display ? 'Cancel' : 'Edit Booking'}</button>
            <button onClick={handleSubmit}>Delete Booking</button>
        </div>
    )
}
