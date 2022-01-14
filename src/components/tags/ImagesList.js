import { memo } from 'react';

function ImagesList( { list = [], onRemove } ) {
    if ( ! list.length ) {
        return null;
    }

    return (
        <>
            {
                list.map( ( { url }, index ) => (
                    <div key={ url } style={ { display: 'flex', justifyContent: 'space-between' } }>
                        <img src={ url } style={ { width: '50px', height: 'auto' } } />

                        <span onClick={ () => onRemove( index ) }>X</span>
                    </div>
                ) )
            }
        </>
    );
}

export default memo( ImagesList );