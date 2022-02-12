import { useState, useRef, useEffect, memo } from 'react';

import styled, { css } from 'styled-components';

import useClassifier from '../../hooks/use-classifier';

import Input from '../../ui/Input';

import { Card } from './Styled';

import CardContent from './CardContent';

const StyledIcon = styled.span`
    cursor: pointer;
`;

const StyledInput = styled( Input )`
    height: 20px;
    width: 160px;

    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '2' ] } ${ theme.spacing[ '4' ] };
        font-size: ${ theme.font.size.sm };
    ` }
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

function TagCard( { name, color, contrast, index, onRename, onRemove } ) {
    const [ isEditMode, setIsEditMode ] = useState( false );

    const { classify } = useClassifier();

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

    const handleDrop = ( e ) => {
        e.preventDefault();

        const imageData = JSON.parse( e.dataTransfer.getData( 'imageData' ) );

        classify( [ name ], imageData.url, imageData );
    };

    useEffect( () => {
        if ( isEditMode ) {
            inputField.current.focus();
        }
    }, [ isEditMode ] );

    return (
        <Card onDrop={ handleDrop } onDragOver={ ( e ) => e.preventDefault() }>
            <StyledHeader color={ color } contrast={ contrast }>
                { ! isEditMode && <h5>{ name }</h5> }
                
                { isEditMode && <StyledInput type="text" defaultValue={ name } ref={ inputField } /> }

                <div>
                    { isEditMode && <StyledIcon onClick={ handleRename }>✔</StyledIcon> }
                    
                    { ! isEditMode && <StyledIcon onClick={ () => setIsEditMode( true ) }>✎</StyledIcon> }
                    
                    { ! isEditMode && <StyledRemoveIcon onClick={ handleRemove }>✖</StyledRemoveIcon> }
                </div>
            </StyledHeader>
            
            <StyledMain>
                <CardContent tagName={ name } />
            </StyledMain>
        </Card>
    );
}

export default memo( TagCard );