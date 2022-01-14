import { useEffect } from 'react';

import useImages from './hooks/use-images';

import ImagesDisplay from './components/images-display/ImagesDisplay';
import Tags from './components/tags/Tags';

function App() {
  const { images } = useImages( [ 'Picsum' ], { limit: 10 } );

  useEffect( () => {
    console.log( 'images from app: ', images );
  }, [ images ] );

  return (
    <div className="App">
        <ImagesDisplay images={ images } />
        <Tags />
      </div>
  );
}

export default App;
