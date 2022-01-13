import { useState, useEffect } from 'react';

import providersMap from '../api/images';

export default function useImages( providers ) {
    const [ images, setImages ] = useState( [] );

    // On mount.
    useEffect( () => {
        const dataProviders = providers.map( ( providerName ) => {
            const provider = new providersMap[ providerName ]();

            return provider.getData();
        } );

        Promise.all( dataProviders ).then( setImages );
    }, [] );

    return {
        images,
    };
}