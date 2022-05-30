import './styles.scss';

const Scoreboard = ({ disabled = true, incorrect = 0, correct = 0, onIncorrect = () => { }, onCorrect = () => { } }) => {


    return (
        <div className={disabled ? "size scoreboard scoreboard-disabled" : "size scoreboard"}>

            <button onClick={onIncorrect}>
                <span>{incorrect}</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="192" y="30" width="8" height="40" rx="4" transform="rotate(-180 139 50)" />
                    <path d="M48 69H13c0-17 4-32 14-43 16-2 31-1 44 5v37c-13 7-20 16-21 27-7-1-9-8-2-26Z" />
                </svg>
            </button>

            <button className="scoreboard-correct" onClick={onCorrect}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="15" y="30" width="8" height="40" rx="4" />
                    <path d="M52 31h35c0 17-4 32-14 43-16 2-31 1-44-5V32c13-7 20-16 21-27 7 1 9 8 2 26Z" />
                </svg>
                <span>{correct}</span>
            </button>

        </div>
    );
}

export default Scoreboard;
