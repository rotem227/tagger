import { useContext } from 'react';

import { Context as TagsContext } from '../../context/tags-provider';

import TagsList from './TagsList';

export default function Tags() {
    const tagsContext = useContext( TagsContext );

    return (
        <section>
            <hr />

            <TagsList list={ tagsContext.tags } />
        </section>
    );
}