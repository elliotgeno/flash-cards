import './styles.scss';

const WordList = ({ list, wordlists, onChange = () => { }, onEdit = () => { } }) => {

    const onSelect = event => onChange(event.target.value)

    return (
        <div className="size controls">


            <div className='select-container'>
                <select name="lists" onChange={onSelect} defaultValue={list}>
                    {
                        Object.entries(wordlists)?.map(([key], index) => (
                            <option value={key} key={`${key}-${index}`} >{key}</option>
                        ))
                    }
                </select>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <path stroke="#fff" strokeLinecap="round" strokeWidth="10" d="M20,25 h60M20,50 h60M20,75 h60" />
                    </svg>

                    {list}
                </span>

            </div>

            <button onClick={onEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" >
                    <path fill="currentColor" d="m26 60-7 21 21-7 31-31-14-14-31 31z" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="10" d="m77 31-8-8" />
                </svg>

                <span>edit</span>
            </button>

        </div>
    );
}

export default WordList;
