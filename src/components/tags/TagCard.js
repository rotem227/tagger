import { memo } from 'react';

function TagCard( { name, color, contrast, index, onRemove } ) {
    const handleRemove = () => {
        if ( window.confirm( `Are you sure you want to delete the tag: ${ name }` ) == true ) {
            onRemove( index );
        }
    };

    return (
        <div style={ { width: '200px', display: 'inline-block', flexShrink: 0, border: '1px solid black' } }>
            <header style={ { color: contrast || '#000', backgroundColor: color, display: 'flex', justifyContent: 'space-between', padding: '5px 10px' } }>
                <h3>{ name }</h3>

                <span onClick={ handleRemove }>X</span>
            </header>
            <main style={ { padding: '10px' } }>
                COntent
            </main>
        </div>
    );
}

export default memo( TagCard );