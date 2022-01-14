import { useContext, useCallback } from 'react';

import { Context } from '../context/classification-provider';

// Saving the images list, per each tag name, in order to filter the tags that each image has already been added to.
const savedImages = {};

const cacheImageClassifications = ( tag, key ) => {
    if ( ! savedImages[ tag ] ) {
        savedImages[ tag ] = {};
    }

    savedImages[ tag ][ key ] = true;
};


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

                cacheImageClassifications( tag, imageData.url );

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

            const removedImageData = tagData.splice( imageIndex, 1 );

            // Removing the image key from the saved images cached data.
            delete savedImages[ tagName ][ removedImageData[ 0 ].url ];

            stateData[ tagName ] = tagData;

            return stateData;
        } );
    }, [] );  

    const renameKey = useCallback( ( oldKey, newKey ) => {
        context.setData( ( prevState ) => {
            const stateData = { ...prevState };

            const savedData = stateData[ oldKey ] ? [ ...stateData[ oldKey ] ] : [];
            const cachedImagesData = savedImages[ oldKey ];

            delete stateData[ oldKey ];
            delete savedImages[ oldKey ];

            stateData[ newKey ] = savedData;
            savedImages[ newKey ] = cachedImagesData;

            return stateData;
        } );
    }, [] );

    const getUsedTags = useCallback( ( key ) => {
        const tags = {};

        Object.entries( savedImages ).forEach( ( [ tagName, data ] ) => {
            if ( data && data[ key ] ) {
                tags[ tagName ] = true;
            }
        } );

        return tags;
    }, [] );

    return {
        data,
        classify,
        removeClassification,
        renameKey,
        getUsedTags,
    };
}