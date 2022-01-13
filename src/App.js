import { useEffect } from 'react';

import useImages from './hooks/use-images';

import ImagesDisplay from './components/images-display/ImagesDisplay';

function App() {
  const { images } = useImages( [ 'Picsum' ], { limit: 10 } );

  useEffect( () => {
    console.log( 'images from app: ', images );
  }, [ images ] );

  return (
    <div className="App">
      <ImagesDisplay images={ images } />
    </div>
  );
}

export default App;
