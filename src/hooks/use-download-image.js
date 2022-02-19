import { useState, useCallback } from 'react';

export default function useDownloadImage() {
    const [ loading, setLoading ] = useState( false );

    const download = useCallback( ( url ) => {
        setLoading( true );

        fetch( url ).then( ( res ) => {
            res.blob().then( ( imageBlob ) => {
                const imageObjectUrl = URL.createObjectURL( imageBlob );

                const fileName = url.split( '/' ).pop();

                const link = document.createElement('a');

                link.href = imageObjectUrl;
                link.download = fileName;

                document.body.appendChild(link);
                
                link.click();
                
                document.body.removeChild(link);

                setLoading( false );
            } );
        } );
    }, [] );

    return {
        loading,
        download,
    };
}