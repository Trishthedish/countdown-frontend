import './CountdownList.css';
import moment from 'moment';

const CountdownList = (props) => {

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
                    <tr>
                        <th>Years</th>
                        <th>Days</th>
                        <th>Hours</th>
                        <th>Minutes</th>
                        <th>Seconds</th>
                    </tr>
                    <td>{`${years}`}</td>
                    <td>{`${days}`}</td>
                    <td>{`${hours}`}</td>
                    <td>{`${minutes}`}</td>
                    <td>{`${seconds}`}</td>
                </table>
            </div>
        )
    }

    return (
        <section className="list-of-countdowns">
            <h1>List of Countdowns</h1>
            <div>
                {props.countdowns && props.countdowns.length > 0 && props.countdowns.map(countdown => {
                    return (
                        <div className="countdowns" key={countdown.id}>
                            <span>
                                <button className="edit-button">edit</button>
                                <button className="delete-button" onClick={() => props.onDelete(countdown.id)}>🗑</button>
                            </span>
                            <h3>{countdown.title}</h3>
                            <p>Countdown: {countdown.countdown_till_date}</p>
                            <p>{calculateTimeLeft(countdown)}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )

}

export default CountdownList;