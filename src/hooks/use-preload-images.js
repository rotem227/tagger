import { useState, useEffect } from 'react';

const preloadImages = ( images ) => {
    const promises = [];

    images.forEach( ( { url } ) => {
        promises.push( new Promise( ( res ) => {
            const img = new Image();

            img.src = url;
            
            img.onload = () => res();
        } ) );
    } );

    return Promise.all( promises );
};

export default function usePreloadImages( images, key ) {
    const [ isAllReady, setIsAllReady ] = useState( false );

    useEffect( () => {
        if ( images?.length ) {
            preloadImages( images ).then( () => setIsAllReady( true ) );
        }
    }, [ images ] );

    return {
        isAllReady,
    };
}