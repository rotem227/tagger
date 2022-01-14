
import { useState } from 'react';

import styled, { css } from 'styled-components';

import useTags from '../../hooks/use-tags';
import useClassifier from '../../hooks/use-classifier';

import Button from '../../ui/Button';
import Input from '../../ui/Input';
import Text from '../../ui/Text';

const StyledWrapper = styled.div`
    border-radius: 2px;
    cursor: pointer;
    position: relative;

    ${ ( { theme } ) => css`
        border: 1px solid ${ theme.color.disabled.dark };
        padding: ${ theme.spacing[ '4' ] };
    ` }
`;

const StyledTagsList = styled.div`
    min-width: 150px;
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 5px;

    ${ ( { theme } ) => css`
        background-color: ${ theme.color.disabled.light };
        border: 1px solid ${ theme.color.disabled.dark };
        padding: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledTagItem = styled.li`
    ${ ( { theme, color, contrast } ) => css`
        color: ${ contrast };
        background-color: ${ color };
        padding: ${ theme.spacing[ '8' ] };
        margin-bottom: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledButton = styled( Button )`
    width: 100%;
`;

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
        <StyledWrapper onMouseMove={ () => setIsSelectMode( true ) }>
            <Text variant="sm">✐ TAG</Text>

            {
                isSelectMode &&
                <StyledTagsList onMouseLeave={ resetSelection }>
                    <ul>
                        {
                            tags.map( ( { name, color, contrast } ) => (
                                < StyledTagItem color={ color } contrast={ contrast } key={ name }>
                                    <Input type="checkbox" value={ selected[ name ] ? 'checked' : '' } onChange={ () => handleSelect( name ) } />  <label>{ name }</label>
                                </ StyledTagItem>
                            ) )
                        }
                    </ul>

                    <StyledButton onClick={ handleApply }>APPLY</StyledButton>
                </StyledTagsList>
            }
        </StyledWrapper>
    );
}