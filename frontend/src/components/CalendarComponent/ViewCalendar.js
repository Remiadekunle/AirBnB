import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserBookings } from "../../store/booking"

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
                <div style={{display: 'flex', gap: '10px'}}>
                    <div>
                        From:
                        {booking.startDate}
                    </div>
                    <div>
                        To:
                        {booking.endDate}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ViewReservations
