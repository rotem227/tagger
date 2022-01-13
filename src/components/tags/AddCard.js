
import { useState } from 'react';

import NewCardData from './NewCardData';

export default function AddCard() {
    const [ isEditMode, setIsEditMode ] = useState( false );
    
    return (
        <div onClick={ () => ! isEditMode && setIsEditMode( true ) } style={ { width: '300px', border: '1px solid black', padding: '20px' } }>
            { isEditMode ? <NewCardData onClose={ () => setIsEditMode( false ) } /> : <span>ADD NEW</span> }
        </div>
    );
}