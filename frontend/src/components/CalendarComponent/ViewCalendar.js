import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteBooking, fetchUserBookings, removeBooking } from "../../store/booking"

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
        <div style={{padding: '30px'}}>
            {filterd && filterd.map(booking => (
                <BookingIndex booking={booking} />
            ))}
        </div>
    )
}

export default ViewReservations


export function BookingIndex({booking}){
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(removeBooking(booking.id))
        // await dispatch(fetchUserBookings())
    }

    return(
        <div style={{display: 'flex', gap: '10px'}}>
            <div>
                From:
                {booking.startDate}
            </div>
            <div>
                To:
                {booking.endDate}
            </div>
            <button onClick={handleSubmit}>Delete Booking</button>
        </div>
    )
}
