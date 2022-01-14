import styled, { css } from 'styled-components';

import ImageTag from './ImageTag';

import Flex from '../../ui/Flex';
import Heading from '../../ui/Heading';
import Text from '../../ui/Text';

const StyledWrapper = styled.div`
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '16' ] };
    ` }
`;

const StyledimagesContainer = styled( Flex )`
    height: calc(100vh - 310px);
    overflow-y: auto;
    position: relative;
    z-index: 3;

    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '16' ] };
    ` }
`;

const StyledImageInfo = styled( Flex )`
    ${ ( { theme } ) => css`
        margin-top: ${ theme.spacing[ '8' ] };
    ` }
`;

const StyledImageBox = styled.div`    
    background-size: cover;
    height: 150px;
    width: 200px;

    ${ ( { url } ) => css`
        background-image: url(${ url });
    ` }
`;

export default function ImagesDisplay( { images } ) {
    if ( ! images.length ) {
        return null;
    }

    return (
        <StyledWrapper>
            <Heading>TAGGER</Heading>

            <StyledimagesContainer wrap gap='20px'>
                {
                    images[ 0 ].map( ( imageData ) => (
                        <div key={ imageData.id }>
                            <StyledImageBox url={ imageData.url } />
                            
                            <StyledImageInfo justifyContent="space-between">
                                <Text>{ imageData.label }</Text>
                                
                                <ImageTag imageData={ imageData } />
                            </StyledImageInfo>
                        </div>
                    ) )
                }
            </StyledimagesContainer>
        </StyledWrapper>
    );
}