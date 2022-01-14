
import { useCallback } from 'react';

import useTags from '../../hooks/use-tags';

import AddCard from './AddCard';
import TagCard from './TagCard';

export default function Tags() {
    const { tags, removeTag } = useTags();

    const handleRemove = useCallback( ( index ) => removeTag( index ), [] );

    return (
        <section style={ { display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' } }>
            <AddCard />

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
                        />
                    );
                } ).reverse()
            }
        </section>
    );
}