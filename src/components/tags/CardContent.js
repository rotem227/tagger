
import { useCallback } from 'react';

import useClassifier from '../../hooks/use-classifier';

import ImagesList from './ImagesList';

export default function CardContent( { tagName } ) {
    const { data, removeClassification } = useClassifier();

    const imagesData = data[ tagName ];

    const onRemove = useCallback( ( key, index ) => removeClassification( tagName, key, index ), [] );

    return <ImagesList list={ imagesData } onRemove={ onRemove } />;
}