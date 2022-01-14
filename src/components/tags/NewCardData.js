import { useRef, useContext, useEffect } from 'react';

import { Context } from '../../context/tags-provider';

const getContrastColor = ( hexColor ) => {
    hexColor = hexColor.replace('#', '');

    const r = parseInt( hexColor.substr( 0,2 ), 16 );
    const g = parseInt( hexColor.substr( 2,2 ), 16 );
    const b = parseInt( hexColor.substr( 4,2 ), 16 );
    const yiq = ( ( r*299 )+( g*587 )+( b*114 ) ) / 1000;

    return ( yiq >= 128 ) ? 'black' : 'white';
};

export default function NewCardData( { onClose } ) {
    const tagsContext = useContext( Context );

    const nameField = useRef( null );

    const colorField = useRef( null );

    const randomColor = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 );

    const handleSave = () => {
        const name = nameField.current.value;

        if ( name ) {
            const color = colorField.current.value;

            tagsContext.setTags( ( prevState ) => [ ...prevState, { name, color, contrast: getContrastColor( color ) } ] );

            onClose();
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