import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const WordList = ({ title: initialTitle, list: initialList, cardLength, onClose = () => { }, onSave = () => { }, onDelete = () => { } }) => {
    const { t } = useTranslation("home");

    const [title, setTitle] = useState(initialTitle);
    const [list, setList] = useState(initialList);



    const onTitle = ({ target }) => setTitle(target.value);
    const onList = ({ target }) => setList(target.value);

    const clean = () => {
        let string = list.replace(/,/g, ', ').replace(/\s+/g, ' ').replace(/ ,/g, ',').replace(/,,/g, ',').trim();
        string = string.split(', ').filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        }).sort().join(", ");
        setList(string);
        return string;
    }

    const onCommit = () => {
        const string = clean();
        onSave(title, string);
        onClose();
    };

    const removeList = () => {
        setTitle("");
        setList("");
        onDelete();
    }

    const onShare = () => {
        const string = clean();
        const queryString = `title=${encodeURIComponent(title)}&words=${string.replace(/\s/g, '').replaceAll(",", "+")}`;
        const url = `${window.location.origin}?${queryString}`;

        if (navigator.share) {
            navigator.share({
                title: `Flash Card List: ${title}`,
                url: url
            }).then(() => {
                window.alert("Thanks for sharing!")
            }).catch(window.alert("Sorry something went wrong!"));
        } else {
            navigator.clipboard.writeText(url).then(() => window.alert(`A link to ${title} has been copied!`));
        }

    }



    return (
        <div className='word-list-container'>
            <div className="word-list">

                <div className="word-list__title-container">
                    <input className="word-list__title" type="text" placeholder={t("word-list-title")} value={title} onChange={onTitle} />

                    {
                        (cardLength > 0 && initialTitle !== "") &&
                        <div className="word-list__list-management">
                            <button onClick={removeList} className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                                    <path fill="none" stroke="currentColor" d="M72 24v54a6 6 0 01-6 6H34a6 6 0 01-6-6V24m29 14v31M43 38v31M22 24h56m-37-8h18" />
                                </svg>
                            </button>
                        </div>
                    }
                </div>
                {/* <textarea className="word-list__word-list" id="word-list" name="word-list" placeholder={t("word-list-placeholder")} value={list} onChange={onList} /> */}
                <div className="word-list__word-list-wrap" data-replicated-value={list}>
                    <textarea className="word-list__word-list" id="word-list" name="word-list" placeholder={t("word-list-placeholder")} value={list} onInput={onList} />
                </div>
                <div className='word-list__buttons'>
                    <button className="save" onClick={onShare} disabled={title === ""}>share</button>
                    <button className="save invert" onClick={onCommit} disabled={title === ""}>save</button>

                </div>

            </div>
        </div>
    );
}

export default WordList;
