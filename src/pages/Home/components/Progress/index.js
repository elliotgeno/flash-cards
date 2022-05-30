import './styles.scss';

const Progress = ({ progress = 0, answers = [], countdown }) => {

    const percent = `${progress * 100}%`;

    return (
        <div className='size progress-bar'>
            <div className='progress-bar--fill' style={{ width: percent }} >
                {
                    answers?.map(({ answer, correct }, index) => {
                        return (
                            <button key={`answer-${answer}-${index}`} title={answer} className={correct ? "size progress-bar--answer" : "size progress-bar--answer progress-bar--answer-incorrect"}>
                                <span>{answer}</span>
                            </button>
                        )
                    })
                }
            </div>
            <span className="progress-bar--countdown">{countdown}</span>
        </div>
    );
}

export default Progress;
