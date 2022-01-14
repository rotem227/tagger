import { memo } from 'react';

import styled, { css } from 'styled-components';

const StyledItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${ ( { theme } ) => css`
        margin: ${ theme.spacing[ '8' ] } 0;
    ` }
`;

const StyledImage = styled.img`
    width: 50px;
    height: auto;
`;

const StyledIcon = styled.span`
    cursor: pointer;
`;

function ImagesList( { list = [], onRemove } ) {
    if ( ! list.length ) {
        return null;
    }

    return (
        <ul>
            {
                list.map( ( { url }, index ) => (
                    <StyledItem key={ url }>
                        <StyledImage src={ url } />

                        <StyledIcon onClick={ () => onRemove( index ) }>✕</StyledIcon>
                    </StyledItem>
                ) )
            }
        </ul>
    );
}

export default memo( ImagesList );