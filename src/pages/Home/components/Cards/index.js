import './styles.scss';


const Cards = ({ cards = [], index }) => {

    return index < cards.length && cards.length > 0 && cards[0] !== "" && (
        <div className="cards">
            <div className="card" >
                <span>{cards[index]}</span>
            </div>
        </div>
    );
}

export default Cards;
