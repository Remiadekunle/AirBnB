import { useState } from 'react'
import Calendar from 'react-calendar'
import { useDispatch } from 'react-redux'
import { createBooking } from '../../store/booking';
import './index.css'

function CalendarComponent({spot}){
    const dispatch = useDispatch();
    const [dates, setDates] = useState([])
    const [errors, setErrors] = useState([])
    console.log('what is the dates varaible', dates)
    const now = new Date()
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors([])
        const newErrors = []
        const [startDate, endDate] = dates
        console.log('ummmmmmmmmmmmmmmmmmmmmmm what are these values', startDate)
        console.log('ok so then what is the month', startDate.getMonth())
        const startMonth = startDate.getMonth()
        console.log('we are testing the values', startDate.getFullYear(), startDate.getUTCMonth(), startDate.getDate())
        console.log('we are testing the values', endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
        const startDat = startDate.getDate()
        const startYear = startDate.getFullYear()
        const endMonth = endDate.getMonth()
        const endDat = endDate.getDate()
        const endYear = endDate.getFullYear()
        const startList = [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()]
        const endList = [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()]
        console.log('what is this actual variable', typeof startDate)
        console.log('what am I submitting', startList.join('-'), endList.join('-'))
        console.log('???????????????????', endList.join('-') <= startList.join('-'))
        await dispatch(createBooking(spot.id, startList.join('-'), endList.join('-'))).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(Object.values(data.errors));
          });

    }
    return(
        <div style={{width: '600px', display: 'flex', justifyContent: 'center', height: '500px', flexDirection: 'column', alignItems: 'center'}}>
            {/* hello */}
            <div>
                Select a date
            </div>
            <div>
                {errors.map(error => (
                    <div>
                        {error}
                    </div>
                ))}
            </div>
            <Calendar className={'spot-reserve-booking-calendar'} selectRange={true} minDate={now} onChange={setDates} />
            <button className='bookings-submit-button' onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default CalendarComponent
