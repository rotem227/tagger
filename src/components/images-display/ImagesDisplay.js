import ImageTag from './ImageTag';

export default function ImagesDisplay( { images } ) {
    if ( ! images.length ) {
        return null;
    }

    return (
        <div style={ { width: '70%', display: 'flex', flexWrap: 'wrap', gap: '20px' } }>
            {
                images[ 0 ].map( ( imageData ) => (
                    <div key={ imageData.id }>
                        <div style={ { width: '200px', height: '150px', backgroundImage: `url(${ imageData.url })`, backgroundSize: 'cover' } }></div>
                        <div style={ { display: 'flex', justifyContent: 'space-between', marginTop: '10px' } }>
                            <label>{ imageData.label }</label>
                            
                            <ImageTag imageData={ imageData } />
                        </div>
                    </div>
                ) )
            }
        </div>
    );
}