import { memo } from 'react';

import styled, { css } from 'styled-components';

const StyledList = styled.ul`
    display: flex;
    flex-direction: column-reverse;
`;

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
    height: 40px;
    object-fit: cover;
`;

const StyledIcon = styled.span`
    cursor: pointer;
`;

function ImagesList( { list = [], onRemove } ) {
    if ( ! list.length ) {
        return null;
    }

    return (
        <StyledList>
            {
                list.map( ( { url }, index ) => (
                    <StyledItem key={ url }>
                        <StyledImage src={ url } />

                        <StyledIcon onClick={ () => onRemove( url, index ) }>✕</StyledIcon>
                    </StyledItem>
                ) )
            }
        </StyledList>
    );
}

export default memo( ImagesList );