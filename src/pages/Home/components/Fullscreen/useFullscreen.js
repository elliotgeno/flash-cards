
import { useState } from 'react';

const useFullscreen = () => {

    const [fullscreen, setFullscreen] = useState(false);

    const isEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

    var elem = document.documentElement;

    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }


    const toggleFullscreen = () => {
        if (fullscreenElement) {
            closeFullscreen();
        } else {
            openFullscreen();
        }
    }

    document.addEventListener("fullscreenchange", () => setFullscreen(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement));
    document.addEventListener("webkitfullscreenchange", () => setFullscreen(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement));
    document.addEventListener("msfullscreenchange", () => setFullscreen(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement));



    return {
        enabled: isEnabled, fullscreen, toggleFullscreen
    }
}


export default useFullscreen;
