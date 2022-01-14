import { useRef, useEffect } from 'react';

import styled, { css } from 'styled-components';

import useTags from '../../hooks/use-tags';

import { Card } from './Styled';

import Button from '../../ui/Button';
import Color from '../../ui/Color';
import Flex from '../../ui/Flex';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';

const StyledCard = styled( Card )`
    display: inline-block;
    flex-shrink: 0;
    
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '20' ] };
    ` }
`;

const StyledInputs = styled( Flex )`
    ${ ( { theme } ) => css`
        margin: ${ theme.spacing[ '16' ] } 0;
    ` }
`;

const StyledInput = styled( Input )`
    width: 110px;
`;

const StyledButton = styled( Button )`
    width: 100%;
`;

export default function AddCard() {
    const { addTag } = useTags();

    const nameField = useRef( null );

    const colorField = useRef( null );

    const randomColor = '#' + ( 0x1000000 + Math.random() * 0xffffff ).toString( 16 ).substr( 1,6 );

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
        <StyledCard>
            <Heading variant="md" color="secondary">CREATE TAG</Heading>

            <StyledInputs alignItems="flex-start" justifyContent="space-between">
                <StyledInput type="text" ref={ nameField } />
                <Color type="color" ref={ colorField } defaultValue={ randomColor } />
            </StyledInputs>
            
            <StyledButton size="md" onClick={ handleSave }>SAVE</StyledButton>
        </StyledCard>
    );
}