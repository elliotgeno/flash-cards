import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Overlay from './components/Overlay';
import Cards from './components/Cards';
import Controls from './components/Controls';
import WordList from './components/WordList';
import './styles.scss';
import useLocalStorage from './useLocalStorage';
import Scoreboard from './components/Scoreboard';
import Timer from './components/Timer';
import Progress from './components/Progress';
import Fullscreen from './components/Fullscreen';
import Finish from './components/Finish';
import ColorSlider from './components/ColorSlider';

const Home = () => {
    const { t } = useTranslation("home");


    const [wordlists, setWordLists] = useLocalStorage({
        "Sample List": "Cat, Dog, Bird, Horse, Cow"
    }, "FLASHCARDS_wordlists");
    const [list, setList] = useLocalStorage(Object.entries(wordlists)?.[0]?.[0], "FLASHCARDS_selected");
    const [listVisible, setListVisible] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);
    const [correct, setCorrect] = useState([]);
    const [incorrect, setIncorrect] = useState([]);
    const [answers, setAnswers] = useState([]);
    const cardString = wordlists?.[list];

    const [cards, setCards] = useState(cardString.split(", ").sort(() => Math.random() - 0.5));

    const finished = answers.length >= cards.length;

    useEffect(() => {
        setCards(cardString.split(", ").sort(() => Math.random() - 0.5));
    }, [cardString]);

    const onListChange = value => {
        setList(value);
        window.location.reload();
    }
    const onEdit = () => setListVisible(true);
    const onClose = () => setListVisible(false);

    const onSave = (key, value) => {
        let newLists = { ...wordlists };
        delete newLists?.[list];
        newLists[key] = value;
        newLists = Object.fromEntries(Object.entries(newLists).sort((a, b) => a[0].toLocaleUpperCase().localeCompare(b[0].toLocaleUpperCase())));
        setWordLists(newLists);
        setList(key);
        window.location.reload();
    }

    const onDelete = () => {
        if (window.confirm(t("delete-list", { list: list }))) {
            let newLists = { ...wordlists };
            delete newLists?.[list];
            setWordLists(newLists);
            onClose();
            setList(Object.entries(wordlists)?.[0]?.[0]);
        }
    };

    const onNew = () => {
        let newLists = { ...wordlists }
        newLists[""] = "";
        setWordLists(newLists);
        setList("");
    };

    const onIncorrect = () => {
        setIncorrect([...incorrect, cards[cardIndex]]);
        setAnswers([...answers, { correct: false, answer: cards[cardIndex] }]);
        setCardIndex(cardIndex + 1);
    };

    const onCorrect = () => {
        setCorrect([...correct, cards[cardIndex]]);
        setAnswers([...answers, { correct: true, answer: cards[cardIndex] }]);
        setCardIndex(cardIndex + 1);
    };

    const onReview = () => {

    };

    const onReset = () => {
        window.location.reload();
    };





    const onCloseOverlay = () => setListVisible(false);

    return (
        <div className="container">
            <Controls list={list} wordlists={wordlists} onChange={onListChange} onEdit={onEdit} />
            <ColorSlider />
            <Fullscreen />
            <Finish score={correct.length / cards.length} index={cardIndex} cards={cards} onReview={onReview} onReset={onReset} />
            <Cards cards={cards} index={cardIndex} />
            <Scoreboard disabled={finished} incorrect={incorrect.length} onIncorrect={onIncorrect} correct={correct.length} onCorrect={onCorrect} />
            <Timer disabled={finished} />
            <Progress countdown={cards.length - cardIndex} progress={cardIndex / cards.length} answers={answers} />
            <Overlay visible={listVisible} onClick={onCloseOverlay} />
            {
                listVisible &&
                <WordList
                    title={list}
                    list={cardString}
                    onClose={onClose}
                    onSave={onSave}
                    onDelete={onDelete}
                    onNew={onNew}
                />
            }
        </div>
    );
}

export default Home;
