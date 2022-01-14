
import { useState } from 'react';

import useTags from '../../hooks/use-tags';
import useClassifier from '../../hooks/use-classifier';

export default function ImageTag( { imageData } ) {
    const [ selected, setSelected ] = useState( {} );

    const [ isSelectMode, setIsSelectMode ] = useState( false );

    const { tags } = useTags();

    const { classify } = useClassifier();

    const resetSelection = () => {
        setIsSelectMode( false );

        setSelected( {} );
    };

    const handleApply = () => {
        classify( Object.keys( selected ), imageData )

        resetSelection();
    };

    const handleSelect = ( tagName ) => {
        if ( selected[ tagName ] ) {
            setSelected( ( prevState ) => {
                const stateData = { ...prevState };

                delete stateData[ tagName ];
                
                return stateData;
            } );
        } else {
            setSelected( ( prevState ) => ( { ...prevState, [ tagName ]: true } ) );
        }
    };

    if ( ! tags.length ) {
        return null;
    }

    return (
        <div onMouseMove={ () => setIsSelectMode( true ) } style={ { position: 'relative', padding: '5px', border: '1px solid black' } }>
            <span>Tag</span>

            {
                isSelectMode &&
                <div onMouseLeave={ resetSelection } style={ { position: 'absolute', minWidth: '150px', top: '-1px', left: '-1px', padding: '10px', border: '1px solid black', backgroundColor: 'lightgrey' } }>
                    <ul>
                        {
                            tags.map( ( { name, color, contrast } ) => (
                                <li key={ name } style={ { color: contrast, backgroundColor: color, padding: '10px', marginBottom: '5px' } }>
                                    <input type="checkbox" value={ selected[ name ] ? 'checked' : '' } onChange={ () => handleSelect( name ) } />  <label>{ name }</label>
                                </li>
                            ) )
                        }
                    </ul>

                    <button onClick={ handleApply } style={ { width: '100%', display: 'block', padding: '10px' } }>APPLY</button>
                </div>
            }
        </div>
    );
}