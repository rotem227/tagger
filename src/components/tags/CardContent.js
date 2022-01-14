
import { useCallback } from 'react';

import useClassifier from '../../hooks/use-classifier';

import ImagesList from './ImagesList';

export default function CardContent( { tagName } ) {
    const { data, removeClassification } = useClassifier();

    const imagesData = data[ tagName ];

    const onRemove = useCallback( ( index ) => removeClassification( tagName, index ), [] );

    return <ImagesList list={ imagesData } onRemove={ onRemove } />;
}