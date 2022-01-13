import React, { useState } from 'react';

export const Context = React.createContext();

export default function TagsProvider( { children } ) {
    const [ tags, setTags ] = useState( [ { name: 'tag1', color: 'blue' }, { name: 'tag2', color: 'green' } ] );

    return (
        <Context.Provider value={ { tags, setTags } }>
            { children }
        </Context.Provider>
    );
}