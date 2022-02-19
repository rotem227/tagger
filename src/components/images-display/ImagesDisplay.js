import styled, { css } from 'styled-components';

import Flex from '../../ui/Flex';
import Grid from '../../ui/Grid';
import Loader from '../../ui/Loader';

import ImageTag from './ImageTag';
import ImageInfo from '../image-info/Image-info';

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

const ContentContainer = styled.div`
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '16' ] } 0;
    ` }
`;

const StyledImageActions = styled( Flex )`
    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '4' ] };
    ` }
`;

const StyledActions = styled( Flex )`
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.65);
    color: #fff;
    transition: all 0.2s linear;
    
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '8' ] } ${ theme.spacing[ '4' ] };
    ` }
`;

const StyledAction = styled.a`
    color: #fff;
    border: 1px solid #fff;
    padding: 3px;

    ${ ( { theme } ) => css`
        font-size: ${ theme.font.size.sm };
    ` }
`;

const StyledImage = styled.img`    
    height: var(--styled-image-height, 25vw);
    width: 100%;
    margin-bottom: -4px;
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
                    <ContentContainer key={ imageData.id }>
                        <StyledImage
                                draggable
                                onDragStart={ ( e ) => e.dataTransfer.setData( 'imageData', JSON.stringify( imageData ) ) }
                                src={ imageData.url }
                                loading={ lazyload ? 'lazy' : null }
                            />
                        
                        <StyledImageActions justifyContent="space-between">
                            <ImageInfo
                                size="sm"
                                provider={ imageData.provider }
                                providerUrl={ imageData.providerUrl }
                                downloadUrl={ imageData.downloadUrl }
                            />

                            <ImageTag imageData={ imageData } />
                        </StyledImageActions>
                    </ContentContainer>
                ) ) :
                <Loader size="xxl"/ >
            }
        </StyledWrapper>
    );
}  