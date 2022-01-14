import { useRef, useEffect } from 'react';

import useTags from '../../hooks/use-tags';

export default function AddCard( { onClose } ) {
    const { addTag } = useTags();

    const nameField = useRef( null );

    const colorField = useRef( null );

    const randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );

    const handleSave = () => {
        const name = nameField.current.value;

        if ( name ) {
            const color = colorField.current.value;

            addTag( { name, color } );

            nameField.current.value = '';
            colorField.current.value = randomColor;
        } else {
            alert( 'Please select a tag name.' );
        }
    };

    useEffect( () => {
        nameField.current.focus();
    }, [] );

    return (
        <div style={ { display: 'inline-block', flexShrink: 0, } }>
            <div>
                <input type="text" ref={ nameField } />
                <input type="color" ref={ colorField } defaultValue={ randomColor } />
            </div>
            
            <button onClick={ handleSave }>Save</button>
        </div>
    );
}