import { useState, useRef } from 'react';

import styled, { css } from 'styled-components';

import useImages from './hooks/use-images';

import Button from './ui/Button';
import Flex from './ui/Flex';
import Heading from './ui/Heading';
import Input from './ui/Input';

import ImagesDisplay from './components/images-display/ImagesDisplay';
import Tags from './components/tags/Tags';

const StyledHeader = styled.header`
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '16' ] };
    ` }
`;

function App() {
  const [ query, setQuery ] = useState( '' );

  const { images } = useImages( [ 'Pixabay', 'Unsplash' ], { query, limit: 50 } );

  const searchInput = useRef( null );

  const handleSearch = () => {
    console.log( 'searchInput.current.value', searchInput.current.value );
    setQuery( searchInput.current.value );
  };

  return (
    <div className="App">
        <StyledHeader>
          <Flex gap="20px" alignItems="center">
            <Heading color="secondary" variant="lg">TAGGER</Heading>

            <Flex gap="10px">
              <Input ref={ searchInput } />

              <Button size="sm" onClick={ handleSearch }>SEARCH</Button>
            </Flex>
          </Flex>
        </StyledHeader>
        
        <ImagesDisplay images={ images } lazyload={ true } />
        
        <Tags />
      </div>
  );
}

export default App;
