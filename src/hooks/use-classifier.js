import { useContext, useCallback, useEffect } from 'react';

import { Context } from '../context/classification-provider';

// Saving the key, per each category, in order to filter the categories that each key has already been added to.
const cachedData = {};

const cacheClassification = ( category, key, data = true ) => {
    if ( ! cachedData[ category ] ) {
        cachedData[ category ] = {};
    }

    cachedData[ category ][ key ] = data;
};

const getClassificationData = ( categories, key, data ) => {
    const newData = {};
    const existingData = {};

    categories.forEach( ( category ) => {
        if ( ! cachedData[ category ] ) {
            cachedData[ category ] = {};
        }

        if ( cachedData[ category ][ key ] ) {
            if ( ! existingData[ category ] ) {
                existingData[ category ] = {};
            }
            
            existingData[ category ][ key ] = data;
        } else {            
            if ( ! newData[ category ] ) {
                newData[ category ] = [];
            }

            newData[ category ].push( data );

            cacheClassification( category, key, data );
        }
    } );

    return {
        newData,
        existingData
    };
};


export default function useClassifier() {
    const context = useContext( Context );

    const classify = useCallback( ( categories, key, data ) => {
        return new Promise( ( res ) => {
            const { newData, existingData } = getClassificationData( categories, key, data );

            const newClassifiedData = Object.entries( newData );

            if ( ! newClassifiedData.length ) {
                return res( { existingData } );
            }

            context.setData( ( prevState ) => {
                const newState = { ...prevState };

                newClassifiedData.forEach( ( [ category, items ] ) => {
                    if ( ! newState[ category ] ) {
                        newState[ category ] = [];
                    }

                    newState[ category ] = [ ...newState[ category ], ...items ]; 
                } );

                res( { existingData } );

                return newState;
            } );
        } );
    }, [] );

    const removeClassification = useCallback( ( category, key, index ) => {
        context.setData( ( prevState ) => {
            const stateData = { ...prevState };

            console.log( 'remove: ', category, key, index );

            // Creating a new instance in order to trigger a state change.
            const categoryKey = [ ...stateData[ category ] ];

            categoryKey.splice( index, 1 );

            // Removing the image category from the saved images cached key.
            delete cachedData[ category ][ key];

            console.log( 'after removal: ', cachedData );

            stateData[ category ] = categoryKey;

            return stateData;
        } );
    }, [] );  

    const renameCategory = useCallback( ( oldCategory, newCategory ) => {
        if ( ! cachedData[ oldCategory ] ) {
            return;
        }

        context.setData( ( prevState ) => {            
            const stateData = { ...prevState };

            const savedkey = stateData[ oldCategory ] ? [ ...stateData[ oldCategory ] ] : [];
            const cachedImageskey = cachedData[ oldCategory ];

            delete stateData[ oldCategory ];
            delete cachedData[ oldCategory ];

            stateData[ newCategory ] = savedkey;
            cachedData[ newCategory ] = cachedImageskey;

            return stateData;
        } );
    }, [] );

    const getCategories = useCallback( ( key ) => {
        const categories = {};

        Object.entries( cachedData ).forEach( ( [ category, data ] ) => {
            if ( data[ key ] ) {
                categories[ category ] = true;
            }
        } );

        return categories;
    }, [] );

    return {
        data: context.data,
        classify,
        removeClassification,
        renameCategory,
        getCategories,
    };
}