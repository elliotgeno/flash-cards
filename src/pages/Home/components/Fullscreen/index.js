import './styles.scss';
import useFullscreen from './useFullscreen';

const Fullscreen = () => {
    const { enabled, fullscreen, toggleFullscreen } = useFullscreen();

    return enabled ? (
        <button onClick={toggleFullscreen} className="size fullscreen">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 16" fill="none" stroke="#FFF" strokeWidth="2" >
                <path d={fullscreen ? "M5 1v4H1m12-4v4h4M5 15v-4H1m16 0h-4v4" : "M1 5V1h4m12 4V1h-4M1 11v4h4m8 0h4v-4"} />
            </svg>
        </button>
    ) : null;
}

export default Fullscreen;
