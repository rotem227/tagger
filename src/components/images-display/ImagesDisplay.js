import { useMemo } from 'react';

import styled, { css } from 'styled-components';

import ImageTag from './ImageTag';

import Flex from '../../ui/Flex';
import Text from '../../ui/Text';

const StyledWrapper = styled( Flex )`
    height: calc(100vh - 300px);
    overflow-y: auto;

    ${ ( { theme } ) => css`
        padding: 0 ${ theme.spacing[ '16' ] } ${ theme.spacing[ '16' ] };
    ` }
`;

const StyledImageInfo = styled( Flex )`
    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledImage = styled.img`    
    height: 150px;
    width: 200px;
    object-fit: cover;
`;

export default function ImagesDisplay( { images } ) {
    if ( ! images.length ) {
        return null;
    }

    return (
        <StyledWrapper id='images-display' wrap gap='20px'>
            {
                images[ 0 ].map( ( imageData, index ) => (
                    <div key={ imageData.id }>
                        <StyledImage src={ imageData.url } />
                        
                        <StyledImageInfo justifyContent="space-between">
                            <Text>{ imageData.label }</Text>
                            
                            <ImageTag imageData={ imageData } />
                        </StyledImageInfo>
                    </div>
                ) )
            }
        </StyledWrapper>
    );
}