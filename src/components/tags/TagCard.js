import { useState, useRef, useEffect, memo } from 'react';

import styled, { css } from 'styled-components';

import Input from '../../ui/Input';

import { Card } from './Styled';

import CardContent from './CardContent';

const StyledIcon = styled.span`
    cursor: pointer;
`;

const StyledInput = styled( Input )`
    height: 20px;
    padding: 2px;
    max-width: 140px;
`;

const StyledRemoveIcon = styled( StyledIcon )`
    ${ ( { theme } ) => css`
        margin-inline-start: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;

    ${ ( { theme, color, contrast } ) => css`
        background-color: ${ color };
        color: ${ contrast || '#000' };
        padding: ${ theme.spacing[ '4' ] } ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledMain = styled.main`
    height: 149px;
    overflow-y: auto;

    ${ ( { theme } ) => css`
        padding: 0 ${ theme.spacing[ '8' ] };
    ` }
`;

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
        <Card>
            <StyledHeader color={ color } contrast={ contrast }>
                { ! isEditMode && <h5>{ name }</h5> }
                
                { isEditMode && <StyledInput type="text" defaultValue={ name } ref={ inputField } /> }

                <div>
                    { isEditMode && <StyledIcon onClick={ handleRename }>✔</StyledIcon> }
                    
                    { ! isEditMode && <StyledIcon onClick={ () => setIsEditMode( true ) }>✎</StyledIcon> }
                    
                    <StyledRemoveIcon onClick={ handleRemove }>✖</StyledRemoveIcon>
                </div>
            </StyledHeader>
            
            <StyledMain>
                <CardContent tagName={ name } />
            </StyledMain>
        </Card>
    );
}

export default memo( TagCard );