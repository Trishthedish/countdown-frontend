import './CountdownList.css';
import Countdown from './Countdown';
import { useState } from 'react';

const CountdownList = (props) => {
    const [editMap, setEditMap] = useState({})
    
    const handleEdit = (countdown) => {
        setEditMap({
            ...editMap,
            [countdown.id]: true
        });
    }

    const cancelEdit = (countdown) => {
        setEditMap({
            ...editMap,
            [countdown.id]: false
        });
    }

    return (
        <section className="list-of-countdowns">
            <h1 className="countdown-list-title">List of Countdowns</h1>
            <div className="container-of-countdowns">
                {props.countdowns && props.countdowns.length > 0 && props.countdowns.map(countdown => {
                    return (
                            <div key={countdown.id}>
                                <Countdown
                                    countdown={countdown}
                                    onDelete={() => props.onDelete(countdown.id)}
                                    onSave={props.onSave}
                                    editMode={editMap[countdown.id]}
                                    handleEdit={() => handleEdit(countdown)}
                                    cancelEdit={() => cancelEdit(countdown)}
                                    refreshCountdowns={props.refreshCountdowns}
                                />
                            </div>
                    )
                })}
            </div>
        </section>
    )
}

export default CountdownList;