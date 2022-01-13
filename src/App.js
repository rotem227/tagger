import { useEffect } from 'react';

import useImages from './hooks/use-images';

function App() {
  const { images } = useImages( [ 'Picsum' ] );

  useEffect( () => {
    console.log( 'images from app: ', images );
  }, [ images ] );

  return (
    <div className="App">

    </div>
  );
}

export default App;
