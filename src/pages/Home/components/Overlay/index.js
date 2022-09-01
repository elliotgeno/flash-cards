import './styles.scss';

const Overlay = ({ visible, onClick = () => { } }) => {
    return (
        <div className={visible ? "overlay overlay-visible" : "overlay"} onClick={onClick} />
    );
}

export default Overlay;
