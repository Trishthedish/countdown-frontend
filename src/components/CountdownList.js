import './CountdownList.css';

const CountdownList = (props) => {

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

                        </div>
                    )
                })}
            </div>
        </section>
    )

}

export default CountdownList;