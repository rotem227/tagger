
import React, { useState, useEffect } from 'react';

import Checkbox from '../../ui/Checkbox';
import Text from '../../ui/Text';

import Providers from '../../api/images/index';

const providersMap = Object.keys( Providers );

export default function ProvidersSelection( { onSelect } ) {
    const [ providers, setProviders ] = useState( Providers );

    const handleSelect = ( provider ) => {
        setProviders( ( prevState ) => {
            const newState = { ...prevState };

            if ( newState[ provider ] ) {
                delete newState[ provider ];
            } else {
                newState[ provider ] = true;
            }

            return newState;
        } );
    };

    useEffect( () => {
        onSelect( Object.keys( providers ) );
    }, [ providers ] );

    return (
        providersMap.map( ( provider ) => (
            <React.Fragment key={ provider }>
                <Checkbox defaultChecked={ true } onChange={ () => handleSelect( provider ) } id={ provider } /> <Text htmlFor={ provider } as="label">{ provider }</Text>
            </React.Fragment>
        ) )
    );
}