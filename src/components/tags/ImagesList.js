import { memo } from 'react';

import styled, { css } from 'styled-components';

import Flex from '../../ui/Flex';
import Text from '../../ui/Text';

import ImageInfo from '../image-info/Image-info';

const StyledList = styled.ul`
    display: flex;
    flex-direction: column-reverse;
`;

const StyledItem = styled.li`
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
                list.map( ( imageData, index ) => (
                    <StyledItem key={ imageData.url }>
                        <Flex alignItems="center" justifyContent="space-between">
                            <Flex gap="5px" alignItems="center">
                                <StyledImage src={ imageData.url } />

                                <ImageInfo
                                    size="xxs"
                                    provider={ imageData.provider }
                                    providerUrl={ imageData.providerUrl }
                                    downloadUrl={ imageData.downloadUrl }
                                    loaderSize='sm'
                                />
                            </Flex>

                            <StyledIcon onClick={ () => onRemove( imageData.url, index ) }>✕</StyledIcon>
                        </Flex>
                    </StyledItem>
                ) )
            }
        </StyledList>
    );
}

export default memo( ImagesList );