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

const INIT_LIST = {
    "Kindergarten - 1": "am, and, at, can, ran, get, red, big, did, in, is, it, not, on, but, run, up, ate, came, here, make, ride, white",
    "Kindergarten - 2": "I, a, the, to, play, see, for, like, have, you, who, what, where, go, so, look, want, come, said, saw, be, he, she, me",
    "Kindergarten - 3": "we, black, blue, brown, yellow, are, little, with, find, no, they, help, jump, was, will, went, one, two, three, four, that, this, there, do",
    "Kindergarten - 4": "my, too, down, must, now, well, new, all, good, say, our, out, eat, soon, please, under, into pretty, funny, away",
    "First - 1": "of, his, her, him, had, some, as, then, could, when, were, them, ask, an, over, just, from, any, how, know, put, take, every, old",
    "First - 2": "by, after, think, let, going, walk, again, may, stop, fly, round, give, once, open, has, live, thank",
    "Second - 1": "pull, sit, tell, best, both, fast, wash, wish, call, cold, sing, five, gave, made, write, why, would, very, your, around, don’t, green, sleep, their",
    "Second - 2": "us, or, been, before, always, friend, buy, these, those, does, goes, use, which, many, found, because, upon, read, work, first, off",
}

const Home = () => {
    const { t } = useTranslation("home");


    const [wordlists, setWordLists] = useLocalStorage(INIT_LIST, "FLASHCARDS_wordlists");
    // const [isReview, setList] = useLocalStorage(Object.entries(wordlists)?.[0]?.[0], "FLASHCARDS_selected");
    const [list, setList] = useLocalStorage(Object.entries(wordlists)?.[0]?.[0], "FLASHCARDS_selected");
    const [listVisible, setListVisible] = useState(false);
    const [cardIndex, setCardIndex] = useState(0);
    const [correct, setCorrect] = useState([]);
    const [reset, setReset] = useState(false);
    const [incorrect, setIncorrect] = useState([]);
    const [answers, setAnswers] = useState([]);
    const cardString = wordlists?.[list];

    const [cards, setCards] = useState(cardString?.split(", ")?.sort(() => Math.random() - 0.5));

    const cardLength = cards?.length ?? 0;



    const finished = answers.length >= cardLength;

    useEffect(() => {
        setCards(cardString?.split(", ")?.sort(() => Math.random() - 0.5));
    }, [cardString]);

    const onListChange = value => {
        if (value === "new-list") {
            onNew();
        } else {
            setList(value);
            window.location.reload();
        }
    }
    const onEdit = () => setListVisible(true);
    const onClose = () => {
        if (list === "" && cardLength > 0) {
            deleteList("");
            window.location.reload();
        }
        setListVisible(false);
    }

    const onSave = (key, value) => {
        let newLists = { ...wordlists };
        delete newLists?.[list];
        newLists[key] = value;
        newLists = Object.fromEntries(Object.entries(newLists).sort((a, b) => a[0].toLocaleUpperCase().localeCompare(b[0].toLocaleUpperCase())));
        setWordLists(newLists);
        setList(key);
        window.location.reload();
    }

    const deleteList = (targetList) => {
        let newLists = { ...wordlists };
        delete newLists?.[targetList];
        setWordLists(newLists);
        const nextList = Object.entries(newLists)?.[0]?.[0] ?? "";
        setList(nextList);
        return nextList;
    }

    const onDelete = () => {
        if (window.confirm(t("delete-list", { list: list }))) {
            const nextList = deleteList(list);
            if (nextList !== "") {
                onClose();
                window.location.reload();
            }
        }
    };

    const onNew = () => {
        let newLists = { ...wordlists }
        newLists[""] = "";
        setWordLists(newLists);
        setList("");
        setListVisible(true);
        setReset(true)
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
        setCards(incorrect.sort(() => Math.random() - 0.5));
        setAnswers([])
        setCorrect([]);
        setIncorrect([]);
        setReset(true);
        setCardIndex(0);
    };

    const onReset = () => {
        window.location.reload();
    };

    return (
        <div className="container">
            <div className='background'></div>
            {
                cardLength > 0 &&
                <>
                    <Controls list={list} wordlists={wordlists} onChange={onListChange} onEdit={onEdit} />
                    <div className='size top-right-controls'>
                        <ColorSlider />
                        <Fullscreen />
                    </div>
                    <Finish score={correct.length / cardLength} index={cardIndex} cards={cards} onReview={onReview} onReset={onReset} />
                    <Cards cards={cards} index={cardIndex} />
                    <Scoreboard disabled={finished} incorrect={incorrect.length} onIncorrect={onIncorrect} correct={correct.length} onCorrect={onCorrect} />
                    <Timer disabled={finished || reset} reset={reset} />
                    <Progress countdown={cardLength - cardIndex} progress={cardIndex / cardLength} answers={answers} />
                </>
            }
            <Overlay visible={listVisible || cardLength === 0} onClick={onClose} />
            {
                (listVisible || cardLength === 0) &&
                <WordList
                    title={list}
                    cardLength={cardLength}
                    list={cardString}
                    onSave={onSave}
                    onDelete={onDelete}
                />
            }
        </div>
    );
}

export default Home;
