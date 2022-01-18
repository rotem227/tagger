import styled, { css } from 'styled-components';

import usePreloadImages from '../../hooks/use-preload-images';

import ImageTag from './ImageTag';

import Flex from '../../ui/Flex';
import Grid from '../../ui/Grid';
import Text from '../../ui/Text';

const StyledWrapper = styled( Grid )`
    height: calc(100vh - 300px);
    overflow-y: auto;

    ${ ( { theme } ) => css`
        padding: 0 ${ theme.spacing[ '16' ] } ${ theme.spacing[ '16' ] };
    ` }

    @media screen and (min-width: 400px) { --ui-grid-columns: 3; }
    @media screen and (min-width: 800px) { --ui-grid-columns: 4; }
    @media screen and (min-width: 1200px) { --ui-grid-columns: 5; }
`;

const ImageContainer = styled.div`
`;

const StyledImageInfo = styled( Flex )`
    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledImage = styled.img`    
    height: var(--styled-image-height, 25vw);
    width: 100%;
    object-fit: cover;

    @media screen and (min-width: 400px) { --styled-image-height: 20vw; }
    @media screen and (min-width: 800px) { --styled-image-height: 15vw; }
    @media screen and (min-width: 1200px) { --styled-image-height: 12vw; }
`;

export default function ImagesDisplay( { images } ) {
    const { isAllReady } = usePreloadImages( images[ 0 ], 'url' );

    if ( ! isAllReady ) {
        return null;
    }

    return (
        <StyledWrapper gap='3vw'>
            {
                images[ 0 ].map( ( imageData ) => (
                    <ImageContainer key={ imageData.id }>
                        <StyledImage src={ imageData.url } />
                        
                        <StyledImageInfo justifyContent="space-between">
                            <Text>{ imageData.label }</Text>
                            
                            <ImageTag imageData={ imageData } />
                        </StyledImageInfo>
                    </ImageContainer>
                ) )
            }
        </StyledWrapper>
    );
}