import { useRef, useContext, useEffect } from 'react';

import { Context } from '../../context/tags-provider';

const randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );

export default function NewCardData( { onClose } ) {
    const tagsContext = useContext( Context );

    const nameField = useRef( null );

    const colorField = useRef( null );

    const handleSave = () => {
        const name = nameField.current.value;

        if ( name ) {
            tagsContext.setTags( ( prevState ) => [ ...prevState, { name, color: colorField.current.value } ] );

            onClose();
        } else {
            alert( 'Please select a tag name.' );
        }
    };

    useEffect( () => {
        nameField.current.focus();
    }, [] );

    return (
        <>
            <div>
                <input type="text" ref={ nameField } />
                <input type="color" ref={ colorField } defaultValue={ randomColor } />
            </div>
            
            <button onClick={ handleSave }>Save</button>
        </>
    );
}