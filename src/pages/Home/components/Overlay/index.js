import './styles.scss';

const WordList = ({ visible, onClick = () => { } }) => {
    return (
        <div className={visible ? "overlay overlay-visible" : "overlay"} onClick={onClick} />
    );
}

export default WordList;
