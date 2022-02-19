import React, { useState } from 'react';

export const Context = React.createContext();

export default function TagsProvider( { children } ) {
    // Array of objects: { name: 'Main', color: '#6d2d9c', contrast: 'white' }.
    const [ tags, setTags ] = useState( [] );

    return (
        <Context.Provider value={ { tags, setTags } }>
            { children }
        </Context.Provider>
    );
}