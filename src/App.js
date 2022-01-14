import { useEffect } from 'react';

import styled, { css } from 'styled-components';

import useImages from './hooks/use-images';

import Heading from './ui/Heading';

import ImagesDisplay from './components/images-display/ImagesDisplay';
import Tags from './components/tags/Tags';

const StyledHeader = styled.header`
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '16' ] };
    ` }
`;

function App() {
  const { images } = useImages( [ 'Picsum' ], { limit: 10 } );

  useEffect( () => {
    console.log( 'images from app: ', images );
  }, [ images ] );

  return (
    <div className="App">
        <StyledHeader>
          <Heading>TAGGER</Heading>
        </StyledHeader>
        
        <ImagesDisplay images={ images } />
        
        <Tags />
      </div>
  );
}

export default App;
