import { memo } from 'react';

function ImagesList( { list = [], onRemove } ) {
    if ( ! list.length ) {
        return null;
    }

    return (
        <ul>
            {
                list.map( ( { url }, index ) => (
                    <li key={ url } style={ { display: 'flex', justifyContent: 'space-between', margin: '10px 0' } }>
                        <img src={ url } style={ { width: '50px', height: 'auto' } } />

                        <span onClick={ () => onRemove( index ) } style={ { cursor: 'pointer' } }>✕</span>
                    </li>
                ) )
            }
        </ul>
    );
}

export default memo( ImagesList );