import { useContext, useCallback } from 'react';

import { Context } from '../context/tags-provider';

const getContrastColor = ( hexColor ) => {
    hexColor = hexColor.replace('#', '');

    const r = parseInt( hexColor.substr( 0,2 ), 16 );
    const g = parseInt( hexColor.substr( 2,2 ), 16 );
    const b = parseInt( hexColor.substr( 4,2 ), 16 );
    const yiq = ( ( r*299 )+( g*587 )+( b*114 ) ) / 1000;

    return ( yiq >= 128 ) ? 'black' : 'white';
};

export default function useTags() {
    const context = useContext( Context );

    const { tags } = context || {};

    const addTag = useCallback( ( { name, color } ) => {
        context.setTags( ( prevState ) => [
            ...prevState,
            {
                name,
                color,
                contrast: getContrastColor( color ),
            },
        ] );
    }, [] );

    const removeTag = useCallback( ( index ) => context.setTags( ( prevState ) => {
        const stateData = [ ...prevState ];

        stateData.splice( index, 1 );

        return stateData;
    } ), [] );

    const renameTag = useCallback( ( index, newName ) => context.setTags( ( prevState ) => {
        const stateData = [ ...prevState ];

        stateData[ index ].name = newName;

        return stateData;
    } ), [] );

    return {
        tags,
        addTag,
        removeTag,
        renameTag,
    };
}