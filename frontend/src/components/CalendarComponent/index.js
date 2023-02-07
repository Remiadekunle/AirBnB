import { useState } from 'react'
import Calendar from 'react-calendar'
import { useDispatch, useSelector } from 'react-redux'
import { createBooking } from '../../store/booking';
import './index.css'

const compareDates = (date, bookings) => {

    return bookings.indexOf(date.getDate()) !== -1
}

const betweenDates = (date, bookings) => {

}

function CalendarComponent({spot}){
    const dispatch = useDispatch();
    const [dates, setDates] = useState([])
    const [errors, setErrors] = useState([])
    console.log('what is the dates varaible', dates)
    const now = new Date()
    const bookingsObj = useSelector(state => state.bookings.spot)
    console.log('what is this bookigns array', bookingsObj)
    const bookings = Object?.values(bookingsObj)

    const handleValidation = ({activeStartDate, date, view }) => {
        // console.log('what are these values 1',activeStartDate)
        // console.log('what are these values 2 ',date)
        // console.log('what are these values 3',date.getDay())
        // console.log('what are these values 4',view)
        // console.log('what are the booked dats', bookedDays)
        return compareDates(date, bookedDays[date.getMonth()])
    }
    const bookedDays =
        {
            '0': [] ,
            '1': [] ,
            '2': [] ,
            '3': [] ,
            '4': [] ,
            '5': [] ,
            '6': [] ,
            '7': [] ,
            '8': [] ,
            '9': [] ,
            '10': [] ,
            '11': []
    }

    bookings.forEach(booking => {
        const {startDate, endDate} = booking
        const startCheck = new Date(startDate)
        const endCheck = new Date(endDate)
        bookedDays[startCheck.getMonth()] = [...bookedDays[startCheck.getMonth()], startCheck.getDate()]
        let arr = []
        if (startCheck.getMonth() === endCheck.getMonth()){
            arr = bookedDays[startCheck.getMonth()]
            for (let i = startCheck.getDate(); i < endCheck.getDate(); i++) {
                if (startCheck.getDate() > endCheck.getDate()) return
                if (arr.indexOf(i) === -1) arr.push(i)
            }
        } else{
            const startArr = bookedDays[startCheck.getMonth()]
            const endArr = bookedDays[endCheck.getMonth()]
            for (let i = startCheck.getDate(); i < 32; i++){
                startArr.push(i)
            }
            for (let i = 1; i < endCheck.getDate(); i++){
                endArr.push(i)
            }
        }

        bookedDays[endCheck.getMonth()] = [...bookedDays[endCheck.getMonth()], endCheck.getDate()]

        // bookedDays.push(endCheck.getDate())
    })
    console.log('what have I done???', bookedDays)
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
    let maxDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
    // maxDate = maxDate.setFullYear(now.getFullYear() + 1)
    console.log('this is the max adate', maxDate)
    console.log('what is the new date', now)
    const [startDate, endDate] = dates
    return(
        <div style={{width: '630px', display: 'flex', justifyContent: 'center', height: '520px', flexDirection: 'column', alignItems: 'center'}}>
            {/* hello */}
            <div>
                Select a date
                <div>
                    Add your travel dates for exact pricing
                </div>
                <div>
                    Bookings only a year out
                </div>
            </div>
            <div>
                {errors.map(error => (
                    <div>
                        {error}
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <div>Check-in</div>
                    {startDate? startDate.toDateString() : 'Add Date'}
                </div>
                <div>
                    <div>Check-in</div>
                    {endDate? endDate.toDateString() : 'Add Date'}
                </div>
            </div>
            <Calendar tileDisabled={handleValidation} className={'spot-reserve-booking-calendar'}  selectRange={true} minDate={now} onChange={setDates} maxDate={maxDate} />
            <button className='bookings-submit-button' onClick={handleSubmit}>
                Submit
            </button>
        </div>
    )
}

export default CalendarComponent
