
import { useContext, useCallback } from 'react';

import { Context as TagsContext } from '../../context/tags-provider';

import AddCard from './AddCard';
import TagCard from './TagCard';

export default function TagsList( { list = [] } ) {
    const tagsContext = useContext( TagsContext );

    const handleRemove = useCallback( ( index ) => tagsContext.setTags( ( prevState ) => {
        const data = [ ...prevState ];

        data.splice( index, 1 );

        return data;
    } ), [] );

    return (
        <div style={ { display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' } }>
                <AddCard />

                {
                    list.map( ( data, index ) => (
                        <TagCard
                            { ...data }
                            key={ data.name }
                            index={ index }
                            onRemove={ handleRemove }
                        />
                    ) ).reverse()
                }
            </div>
    );
}