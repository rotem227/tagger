import { useState, useEffect } from 'react';

const preloadImages = ( images, key ) => {
    const promises = [];

    images.forEach( ( image, index ) => {
        promises.push( new Promise( ( res ) => {
            const img = new Image();

            img.src = key ? image[ key ] : image;
            
            img.onload = () => res();
        } ) );
    } );

    return Promise.all( promises );
};

export default function usePreloadImages( images = [], config = {} ) {
    const [isReady, setIsReady ] = useState( false );

    const { key, limit } = config;

    useEffect( () => {
        if ( images.length ) {
            const bulk = limit ? images.slice( 0, limit ) : images;

            preloadImages( bulk, key ).then( () => setIsReady( true ) );
        }
    }, [ images ] );

    return {
       isReady,
    };
}