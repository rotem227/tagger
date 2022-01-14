import { useState, useRef, useEffect, memo } from 'react';

import CardContent from './CardContent';

function TagCard( { name, color, contrast, images, index, onRename, onRemove } ) {
    const [ isEditMode, setIsEditMode ] = useState( false );

    const inputField = useRef( null );

    const handleRemove = () => {
        if ( window.confirm( `Are you sure you want to delete the tag: ${ name }` ) == true ) {
            onRemove( index );
        }
    };

    const handleRename = () => {
        const newName = inputField.current.value;

        onRename( { index, newName, oldName: name } );

        inputField.current.value = '';

        setIsEditMode( false );
    };

    useEffect( () => {
        if ( isEditMode ) {
            inputField.current.focus();
        }
    }, [ isEditMode ] );

    return (
        <div style={ { width: '200px', display: 'inline-block', flexShrink: 0, border: '1px solid black' } }>
            <header style={ { color: contrast || '#000', backgroundColor: color, display: 'flex', justifyContent: 'space-between', padding: '5px 10px' } }>
                { ! isEditMode && <h5>{ name }</h5> }
                
                { isEditMode && <input type="text" defaultValue={ name } ref={ inputField } style={ { maxWidth: '130px' } } /> }

                <div>
                    { isEditMode && <span onClick={ handleRename } style={ { cursor: 'pointer' } }>✔</span> }
                    { ! isEditMode && <span onClick={ () => setIsEditMode( true ) } style={ { cursor: 'pointer' } }>✎</span> }
                    <span onClick={ handleRemove } style={ { cursor: 'pointer',  marginInlineStart: '10px' } }>✖</span>
                </div>
            </header>
            
            <main style={ { padding: '0 10px' } }>
                <CardContent tagName={ name } />
            </main>
        </div>
    );
}

export default memo( TagCard );