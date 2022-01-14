import styled, { css } from 'styled-components';

import ImageTag from './ImageTag';

import Flex from '../../ui/Flex';
import Heading from '../../ui/Heading';
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

const StyledImageBox = styled.div`    
    background-size: cover;
    height: 150px;
    width: 200px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    ${ ( { url } ) => css`
        background-image: url(${ url });
    ` }
`;

export default function ImagesDisplay( { images } ) {
    if ( ! images.length ) {
        return null;
    }

    return (
        <StyledWrapper wrap gap='20px'>
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
        </StyledWrapper>
    );
}