
import { useState } from 'react';

const useFullscreen = () => {

    const [fullscreen, setFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    document.addEventListener("fullscreenchange", () => setFullscreen(document.fullscreenElement));

    return { enabled: document.fullscreenEnabled, fullscreen, toggleFullscreen }
}

export default useFullscreen;
