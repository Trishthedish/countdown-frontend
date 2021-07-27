import { useState, useEffect } from 'react';
import moment from 'moment';

const TimeLeft = (props) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log('something')
        let timerId = setInterval(tick, 1000);
        return function cleanup() {
            clearInterval(timerId);
        }
    }, []);

    const tick = () => {
        setDate(new Date());
    }
    const calculateTimeLeft = (countdown) => {
        let target = moment(props.countdown_till_date)
        let current = moment.now()
        let years = target.diff(current, 'years')
        let milliseconds = target.diff(current, 'milliseconds')
        if (milliseconds < 0) {
            return (
                <div>Countdown is up!!</div>
            )
        }

        let yearDiff = "" + years;
        let monthDiff = moment(milliseconds).format("M") - 1;
        let dayDiff = moment(milliseconds).format("D"); 
        let hourDiff = moment(milliseconds).format("H");
        let minDiff = moment(milliseconds).format("mm");
        let secDiff = moment(milliseconds).format("ss");

        return(
            <div>
                <section>{yearDiff} Years(s)</section>
                <section>{monthDiff} Months(s)</section>
                <section>{dayDiff} Day(s)</section>
                <section>{hourDiff} Hour(s)</section>
                <section>{minDiff}Minute(s)</section>
                <section>{secDiff} Second(s)</section>
            </div>
        )
    }

    return (
        <div>
            <h2>Time Left</h2>
            {calculateTimeLeft(props.countdown_till_date)}
        </div>
    )
}
export default TimeLeft;