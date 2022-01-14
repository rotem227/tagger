import { useContext, useCallback } from 'react';

import { Context } from '../context/classification-provider';

export default function useClassifier() {
    const context = useContext( Context );

    const { data } = context || {};

    const classify = useCallback( ( tagName, imageData ) => {
        context.setData( ( prevState) => {
            const stateData = { ...prevState };

            if ( ! stateData[ tagName ] ) {
                stateData[ tagName ] = [];
            }

            // Creating a new instance in order to trigger a state change.
            stateData[ tagName ] = [ ...stateData[ tagName ], imageData ];

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

    return {
        data,
        classify,
        removeClassification,
    };
}