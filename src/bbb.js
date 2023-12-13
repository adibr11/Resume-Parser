import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';


function BBB() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [JSONDATA, setJSONDATA] = useState([]);

    const debouncedSetSearchTerm = useCallback(
        (newSearchTerm) => {
            setTimeout(() => {
                setDebouncedSearchTerm(newSearchTerm);
            }, 500);
        },
        [setDebouncedSearchTerm]
    );

    const getUser = async (searchTerm) => {
        const response = await fetch(`http://localhost:3000/search?parameterName=${searchTerm}`);
        const data = await response.json();
        setJSONDATA(data);
    }

    useEffect(() => {
        getUser(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    return (
        <div className="Lookup">
            <input
                type="text"
                placeholder="Keyword..."
                onChange={(event) => debouncedSetSearchTerm(event.target.value)}
            /><h2> Resumes that match the keywords: </h2>
            {JSONDATA.map((val, key) => {
                return (
                    <div className="user" key={key}>
                        <p> Name - {val.name}</p> <br></br> <p> E- Mail - {val.email}</p>

                    </div>
                );
            })}
        </div>
    );

}

export default BBB;
