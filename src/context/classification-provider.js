import React, { useState } from 'react';

export const Context = React.createContext();

export default function ClassificationProvider( { children } ) {
    const [ data, setData ] = useState( {} );

    return (
        <Context.Provider value={ { data, setData } }>
            { children }
        </Context.Provider>
    );
}