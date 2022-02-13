import { useState, useEffect } from 'react';

import providersMap from '../api/images';

export default function useImages( providers, config = {} ) {
    const [ images, setImages ] = useState( [] );

    // On mount.
    useEffect( () => {
        if ( providers.length ) {
            const dataProviders = providers.map( ( providerName ) => {
                const provider = new providersMap[ providerName ]( config );

                return provider.getData();
            } );

            Promise.all( dataProviders ).then( setImages );
        }
    }, [ config.query ] );

    return {
        images,
    };
}