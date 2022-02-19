import { useState, useRef } from 'react';

import styled, { css } from 'styled-components';

import useImages from './hooks/use-images';

import Button from './ui/Button';

import Flex from './ui/Flex';
import Heading from './ui/Heading';
import Input from './ui/Input';

import ProvidersSelection from './components/providers-selection/providers-selection';
import ImagesDisplay from './components/images-display/ImagesDisplay';
import Tags from './components/tags/Tags';

const StyledHeader = styled.header`
    ${ ( { theme } ) => css`
        padding: ${ theme.spacing[ '16' ] };
        border-bottom: 1px solid ${ theme.color.disabled.main };
    ` }
`;

function App() {
  const [ search, setSearch ] = useState( { query: '', providers: [] } );

  const { providers, query } = search;

  const { images } = useImages( providers, { query, limit: 50 } );

  const searchInput = useRef( null );

  const handleSearch = () => setSearch( { query: searchInput.current.value, providers } );

  const handleProviders = ( selectedProviders ) => {
    setSearch( ( prevState ) => ( { ...prevState, providers: selectedProviders } ) );
  };

  return (
    <div className="App">
        <StyledHeader>
          <Flex gap="20px" alignItems="center">
            <Heading color="secondary" variant="lg">TAGGER</Heading>

            <Flex gap="10px" alignItems="center">
              <Input size="sm" ref={ searchInput } />

              <Button size="sm" onClick={ handleSearch }>SEARCH</Button>

              <Flex gap="5px" alignItems="center">
                <ProvidersSelection onSelect={ handleProviders } />
              </Flex>
            </Flex>
          </Flex>
        </StyledHeader>
        
        <ImagesDisplay images={ images } lazyload={ true } />
        
        <Tags />
      </div>
  );
}

export default App;
