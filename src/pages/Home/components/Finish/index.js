import './styles.scss';

const NUM_STARS = 5;

const Finish = ({ score = 0, cards = [], index = 0, review = true, onReview = () => { }, onReset = () => { } }) => {

    const percent = `${score * 100}%`;

    return index >= cards.length && (
        <div className='size finish'>
            <svg className="stars" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox={`0 0 ${50 * NUM_STARS} 50`}>
                <defs>
                    <polygon id="star" points="25,9 29,21 42,21 31,29 36,41 25,33 14,41 19,29 8,21 21,21 " />
                    <clipPath id="mask">
                        <rect id="stars-mask" width={percent} height="100%" />
                    </clipPath>
                    <g id="star-group">
                        {
                            Array(NUM_STARS).fill().map((_, i) => (
                                <use xlinkHref="#star" x={50 * i} key={`star-${i}`} />
                            ))
                        }
                    </g>
                </defs>
                <use xlinkHref="#star-group" stroke="#444" strokeWidth="14" strokeLinejoin="round" />
                <use xlinkHref="#star-group" fill="white" stroke="#fff" strokeWidth="6" strokeLinejoin="round" clipPath="url(#mask)" />

            </svg>
            <div>
                {score < 1 && <button className='invert' onClick={onReview}>review</button>}
                <button onClick={onReset}>reset</button>
            </div>
        </div>
    );
}

export default Finish;
