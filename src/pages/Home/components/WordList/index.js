import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles.scss';

const WordList = ({ title: initialTitle, list: initialList, onClose = () => { }, onSave = () => { }, onDelete = () => { }, onNew = () => { } }) => {
    const { t } = useTranslation("home");

    const [title, setTitle] = useState(initialTitle);
    const [list, setList] = useState(initialList);

    const onTitle = ({ target }) => setTitle(target.value);
    const onList = ({ target }) => setList(target.value);

    const onCommit = () => {
        let string = list.replace(/,/g, ', ').replace(/\s+/g, ' ').replace(/ ,/g, ',').replace(/,,/g, ',').trim();
        string = string.split(', ').filter(function (item, pos, self) {
            return self.indexOf(item) === pos;
        }).sort().join(", ");
        setList(string);
        onSave(title, string);
        onClose();
    };

    const removeList = () => {
        setTitle("");
        setList("");
        onDelete();
    }

    const createList = () => {
        setTitle("");
        setList("");
        onNew();
    }

    return (
        <div className='word-list-container'>
            <div className="word-list">
                <button className="word-list__close" onClick={onClose}>X</button>
                <input className="word-list__title" type="text" placeholder={t("word-list-title")} value={title} onChange={onTitle} />
                <textarea className="word-list__word-list" id="word-list" name="word-list" placeholder={t("word-list-placeholder")} value={list} onChange={onList} />
                <div>
                    <button onClick={removeList}>-</button>
                    <button onClick={createList}>+</button>
                    <button onClick={onCommit} disabled={title === ""}>SAVE</button>
                </div>
            </div>
        </div>
    );
}

export default WordList;
