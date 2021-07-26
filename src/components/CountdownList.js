import './CountdownList.css';
import { useState } from 'react';
import CountdownForm from './CountdownForm';
import moment from 'moment';

const CountdownList = (props) => {
    const [editMap, setEditMap] = useState({})

    const calculateTimeLeft = (countdown) => {
        let target = moment(countdown.countdown_till_date)
        let current = moment.now()
        let days = target.diff(current, 'days');
        let years = target.diff(current, 'years')
        let hours = target.diff(current, 'hours')
        let minutes = target.diff(current, "minutes")
        let seconds = target.diff(current, 'seconds')

        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Years</th>
                            <th>Days</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                        </tr>
                        <tr>
                            <td>{`${years}`}</td>
                            <td>{`${days}`}</td>
                            <td>{`${hours}`}</td>
                            <td>{`${minutes}`}</td>
                            <td>{`${seconds}`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
       ) 
    }

    const handleEdit = (countdown) => {
        setEditMap({
            ...editMap,
            [countdown.id]: true
        });
    }

    return (
        <section className="list-of-countdowns">
            <h1>List of Countdowns</h1>
            <div>
                {props.countdowns && props.countdowns.length > 0 && props.countdowns.map(countdown => {
                    return (
                        <div  key={countdown.id} className="countdowns">
                            {(editMap[countdown.id]) ?
                            <div>
                                <CountdownForm
                                    countdown={countdown}
                                />
                            </div>
                            :
                            <>
                                <span>
                                    <button className="edit-button" onClick={() => handleEdit(countdown)}>edit</button>
                                    <button className="delete-button" onClick={() => props.onDelete(countdown.id)}>🗑</button>
                                </span>
                                <h3>{countdown.title}</h3>
                                <p>Countdown: {countdown.countdown_till_date}</p>
                                <div>{calculateTimeLeft(countdown)}</div>
                            </>
                            }
                        </div>
                    )
                })}
            </div>
        </section>
    )

}

export default CountdownList;