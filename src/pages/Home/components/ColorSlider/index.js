
import { useEffect } from 'react';
import useLocalStorage from 'pages/Home/useLocalStorage';
import './styles.scss';

const ColorSlider = () => {

    const root = document.documentElement;
    const [hue, setHue] = useLocalStorage(0, "FLASHCARDS_hue");

    const percent = hue / 360;

    const onChange = ({ target }) => {
        setHue(target.value);
    }

    useEffect(() => {
        root.style.setProperty('--hue', hue);
    }, [hue, root]);

    return (
        <div className="size color-slider" tabIndex="0">

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M61 47 50 57a15 15 0 0 0-6-6l11-11c13-13 23-24 27-20s-8 14-21 27ZM48 63a12 12 0 0 0-24 0c0 8-2 15-6 18 17 0 30-8 30-18Z" fill="#fff" />
            </svg >

            <div className='color-selector'>
                <div className='color-selector--groove'>
                    <div className='color-selector--dot' style={{ left: `calc(${5 * percent}em - 4px)` }}></div>
                </div>
                <input type="range" id="color" name="color" min="0" max="360" value={hue} step="1" onChange={onChange} />
                <label htmlFor="color">Color</label>
            </div>

        </div>
    );
}

export default ColorSlider;
