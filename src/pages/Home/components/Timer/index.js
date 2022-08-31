import { useEffect, useState } from 'react';
import moment from 'moment';
import './styles.scss';

const Timer = ({ disabled = false, reset = false }) => {

    const [seconds, setSeconds] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        let interval = null;

        if (disabled) {
            clearInterval(interval);
        } else if (!paused) {
            interval = setInterval(() => setSeconds(seconds => seconds + 1), 1000);
        } else if (!paused && seconds !== 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [paused, seconds, disabled, reset]);


    useEffect(() => {
        setSeconds(0);
        setPaused(false);
    }, [reset]);

    const onChange = () => {
        setPaused(!paused)
    }

    const formatted = moment().startOf('day').seconds(seconds).format('m:ss');

    return (
        <label className="size timer">
            <input type="checkbox" checked={paused} onChange={onChange} />
            <span>{formatted}</span>
        </label>
    );
}

export default Timer;
