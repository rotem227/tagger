
import { useCallback } from 'react';

import useTags from '../../hooks/use-tags';
import useClassifier from '../../hooks/use-classifier';

import AddCard from './AddCard';
import TagCard from './TagCard';

export default function Tags() {
    const { tags, removeTag, renameTag } = useTags();
    const { renameKey } = useClassifier();

    const handleRemove = useCallback( ( index ) => removeTag( index ), [] );

    const handleRename = useCallback( ( { index, oldName, newName } ) => {
        renameTag( index, newName );

        renameKey( oldName, newName );
    }, [] );

    return (
        <section style={ { display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' } }>
            <AddCard />

            <div style={ { display: 'flex', flexWrap: 'nowrap', flexDirection: 'row-reverse' } }>
                {
                tags.map( ( { name, color, contrast, images }, index ) => {
                    return (
                        <TagCard
                            key={ name }
                            name={ name }
                            color={ color }
                            contrast={ contrast }
                            images={ images }
                            index={ index }
                            onRemove={ handleRemove }
                            onRename={ handleRename }
                        />
                    );
                } )
            }
            </div>
        </section>
    );
}