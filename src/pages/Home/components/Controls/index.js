import './styles.scss';

const WordList = ({ list, wordlists, onChange = () => { }, onEdit = () => { } }) => {

    const onSelect = event => onChange(event.target.value)

    return (
        <div className="size controls">
            <button onClick={onEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" >
                    <path fill="currentColor" d="m26 60-7 21 21-7 31-31-14-14-31 31z" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="10" d="m77 31-8-8" />
                </svg>

                <span>edit</span>
            </button>

            <div className='select-container'>
                <select name="lists" onChange={onSelect} defaultValue={list}>
                    {
                        Object.entries(wordlists)?.map(([key], index) => (
                            <option value={key} key={`${key}-${index}`} >{key}</option>
                        ))
                    }
                </select>
                <span>{list}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <path fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="10" d="m20 35 30 30 30-30" />
                    </svg>
                </span>

            </div>

        </div>
    );
}

export default WordList;
