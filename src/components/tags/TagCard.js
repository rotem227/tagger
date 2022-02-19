import { useState, useRef, useEffect, memo } from 'react';

import styled, { css } from 'styled-components';

import useClassifier from '../../hooks/use-classifier';

import Flex from '../../ui/Flex';
import Input from '../../ui/Input';

import { Card } from './Styled';

import CardContent from './CardContent';

const StyledIcon = styled.span`
    cursor: pointer;

    ${ ( { theme } ) => css`
        &:last-child {
            margin-inline-start: ${ theme.spacing[ '8' ] };
        }
    ` }
`;

const StyledInput = styled( Input )`
    height: 20px;
    width: 135px;
`;

const StyledHeader = styled( Flex )`
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
            <StyledHeader as="header" alignItems="center" justifyContent="space-between" color={ color } contrast={ contrast }>
                { ! isEditMode && <h5>{ name }</h5> }
                
                { isEditMode && <StyledInput size="xs" type="text" defaultValue={ name } ref={ inputField } /> }

                <Flex alignItems="center">
                    { isEditMode && <StyledIcon onClick={  () => setIsEditMode( false ) }>⊘</StyledIcon> }

                    { isEditMode && <StyledIcon onClick={ handleRename }>✔</StyledIcon> }
                    
                    { ! isEditMode && <StyledIcon onClick={ () => setIsEditMode( true ) }>✎</StyledIcon> }
                    
                    { ! isEditMode && <StyledIcon onClick={ handleRemove }>✖</StyledIcon> }
                </Flex>
            </StyledHeader>
            
            <StyledMain>
                <CardContent tagName={ name } />
            </StyledMain>
        </Card>
    );
}

export default memo( TagCard );