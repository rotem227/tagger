import { memo } from 'react';

import styled, { css } from 'styled-components';

import Button from '../../ui/Button';
import Input from '../../ui/Input';

const StyledTagsList = styled.div`
    min-width: 150px;
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 5px;
    z-index: 5;

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

function ImageTagItem( { tags, selected, isSelectMode, onReset, onSelect, onApply } ) {
    if ( ! isSelectMode ) {
        return null;
    }
    
    return (
        <StyledTagsList onMouseLeave={ onReset }>
            <ul>
                {
                    tags.map( ( { name, color, contrast } ) => (
                        < StyledTagItem color={ color } contrast={ contrast } key={ name }>
                            <Input type="checkbox" value={ selected[ name ] ? 'checked' : '' } onChange={ () => onSelect( name ) } />  <label>{ name }</label>
                        </ StyledTagItem>
                    ) )
                }
            </ul>

            <StyledButton onClick={ onApply }>APPLY</StyledButton>
        </StyledTagsList>
    );
}

export default memo( ImageTagItem );