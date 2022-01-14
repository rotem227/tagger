
import { useState, useEffect, useRef } from 'react';

import { useContext } from 'react';

import { Context as TagsContext } from '../../context/tags-provider';

const tagsDefaultOption = {
    name: 'Select..',
    color: '#fff',
};

export default function ImageTag() {
    const tagsContext = useContext( TagsContext );
    
    const [ isSelectMode, setIsSelectMode ] = useState( false );

    const tags = [ tagsDefaultOption, ...tagsContext.tags ];

    const timer = useRef( null );

    const tagsSelect = useRef( null );

    const isActiveSelection = useRef( false );

    const handleTagSelectionEnter = () => {
        if ( timer.current ) {
            clearTimeout( timer.current );
        }

        setIsSelectMode( true );
    };

    const handleTagSelectionLeave = () => {
        /*
            In case that there was a click on the select box, there should be a delayed before the modal is closed.
            Otherwise, if selecteing an option outside of the modal (when the tags list is very long),
            The modal will be closed once an option is seleted, and it won't be possible to click on the Apply button.
        */
        if ( isActiveSelection.current ) {
            isActiveSelection.current = false;

            timer.current = setTimeout( () => {
                setIsSelectMode( false );
            }, 2000 );
        } else {
            setIsSelectMode( false );
        }
    };

    const handleApply = () => {
        if ( tagsDefaultOption.name !== tagsSelect.current.value ) {
            console.log( 'selected tag: ', tagsSelect.current.value );
        }

        setIsSelectMode( false );
    };

    const handleSelectClick = () => {
        isActiveSelection.current = true;
    };

    return (
        <div onMouseEnter={ handleTagSelectionEnter } style={ { position: 'relative', padding: '5px', border: '1px solid black' } }>
            <span>Tag</span>

            {
                isSelectMode &&
                <div style={ { position: 'absolute', top: '-1px', left: '-1px', padding: '10px', border: '1px solid black', backgroundColor: 'lightgrey' } }  onMouseLeave={ handleTagSelectionLeave }>
                    <select onClick={ handleSelectClick } ref={ tagsSelect } style={ { width: '100%', padding: '10px' } }>
                        {
                            tags.map( ( { name, color, contrast } ) => (
                                <option key={ name } value={ name } style={ { backgroundColor: color, color: contrast } }>{ name }</option>
                            ) )
                        }
                    </select>

                    <button onClick={ handleApply } style={ { display: 'block', padding: '10px', marginTop: '10px' } }>APPLY</button>
                </div>
            }
        </div>
    );
}