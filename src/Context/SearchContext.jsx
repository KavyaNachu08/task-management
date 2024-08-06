import { createContext, useState } from "react";

const SearchContext= createContext("");

function SearchProvider({children}) {
    const [searchPhrase, setSearchPhrase] = useState("");
    return <SearchContext.Provider value={[searchPhrase, setSearchPhrase]}>
        {children}
    </SearchContext.Provider>
}

export {SearchProvider, SearchContext};