import React, { useState } from 'react';

export const Context = React.createContext();

export default function TagsProvider( { children } ) {
    const [ tags, setTags ] = useState( [] );

    return (
        <Context.Provider value={ { tags, setTags } }>
            { children }
        </Context.Provider>
    );
}