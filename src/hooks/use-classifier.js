import { useContext, useCallback } from 'react';

import { Context } from '../context/classification-provider';

export default function useClassifier() {
    const context = useContext( Context );

    const { data } = context || {};

    const classify = useCallback( ( tags, imageData ) => {
        context.setData( ( prevState) => {
            const stateData = { ...prevState };

            tags.forEach( ( tag ) => {
                if ( ! stateData[ tag ] ) {
                    stateData[ tag ] = [];
                }

                // Creating a new instance in order to trigger a state change.
                stateData[ tag ] = [ ...stateData[ tag ], imageData ];
            } );

            return stateData;
        } );
    }, [] );

    const removeClassification = useCallback( ( tagName, imageIndex ) => {
        context.setData( ( prevState ) => {
            const stateData = { ...prevState };

            // Creating a new instance in order to trigger a state change.
            const tagData = [ ...stateData[ tagName ] ];

            tagData.splice( imageIndex, 1 );

            stateData[ tagName ] = tagData;

            return stateData;
        } );
    }, [] );  

    const renameKey = useCallback( ( oldKey, newKey ) => {
        context.setData( ( prevState ) => {
            const stateData = { ...prevState };

            const savedData = [ ...stateData[ oldKey ] ];

            delete stateData[ oldKey ];

            stateData[ newKey ] = savedData;

            return stateData;
        } );
    }, [] );

    return {
        data,
        classify,
        removeClassification,
        renameKey,
    };
}