import styled, { css } from 'styled-components';

import ImageTag from './ImageTag';

import Flex from '../../ui/Flex';
import Grid from '../../ui/Grid';
import Loader from '../../ui/Loader';
import Text from '../../ui/Text';

const StyledWrapper = styled( Grid )`
    height: calc(100vh - 300px);
    overflow-y: auto;
    position: relative;

    ${ ( { theme } ) => css`
        padding: 0 ${ theme.spacing[ '16' ] } ${ theme.spacing[ '16' ] };
    ` }

    @media screen and (min-width: 400px) { --ui-grid-columns: 3; }
    @media screen and (min-width: 800px) { --ui-grid-columns: 4; }
    @media screen and (min-width: 1200px) { --ui-grid-columns: 5; }
`;

const ImageContainer = styled.div`
    position: relative;
`;

const ImageProvider = styled( Text )`
    padding: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
`;

const StyledImageInfo = styled( Flex )`
    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '4' ] };
    ` }
`;

const StyledImage = styled.img`    
    height: var(--styled-image-height, 25vw);
    width: 100%;
    object-fit: cover;
    cursor: grab;

    @media screen and (min-width: 400px) { --styled-image-height: 20vw; }
    @media screen and (min-width: 800px) { --styled-image-height: 15vw; }
    @media screen and (min-width: 1200px) { --styled-image-height: 12vw; }
`;

export default function ImagesDisplay( { images, lazyload } ) {
    const imagesData = images.flat();

    imagesData.sort( () => Math.floor( Math.random() * 3 ) - 1 );

    return (
        <StyledWrapper gap='3vw'>
            {
                imagesData?.length ?
                imagesData.map( ( imageData ) => (
                    <ImageContainer key={ imageData.id }>
                        <StyledImage
                            draggable
                            onDragStart={ ( e ) => e.dataTransfer.setData( 'imageData', JSON.stringify( imageData ) ) }
                            src={ imageData.url }
                            loading={ lazyload ? 'lazy' : null }
                        />
                        
                        <StyledImageInfo justifyContent="space-between">
                            <Flex alignItems="flex-start" gap="5px">
                                <Text variant="sm">{ imageData.provider }</Text>
                                <Text variant="sm" color="secondary">|</Text>
                                <Text variant="sm">{ imageData.label }</Text>
                            </Flex>
                            
                            <ImageTag imageData={ imageData } />
                        </StyledImageInfo>
                    </ImageContainer>
                ) ) :
                <Loader/ >
            }
        </StyledWrapper>
    );
}  