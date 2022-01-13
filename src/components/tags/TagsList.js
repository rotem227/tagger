
import AddCard from './AddCard';
import TagCard from './TagCard';

export default function TagsList( { list = [] } ) {
    return (
        <div style={ { display: 'flex' } }>
            <AddCard />

            {
                list.map( ( { name, color } ) => (
                    <TagCard key={ name } name={ name } color={ color } />
                ) ).reverse()
            }
        </div>
    );
}