import { useEffect, useState } from 'react'

interface SearchInputProps {
    onSearch: (value: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {

    const [input, setInput] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(input)
        }, 500)

        return () => clearInterval(timeout)
    }, [input])

    return (
        <>
            <input
                name='search'
                type='text'
                placeholder='Search employees...'
                onChange={(e) => setInput(e.target.value)}
                className='border p-2 rounded search-input'
                style={{marginBottom: "15px"}}
            />
        </>
    )
}

export default SearchInput
