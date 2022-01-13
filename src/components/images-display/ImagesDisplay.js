export default function ImagesDisplay( { images } ) {
    if ( ! images.length ) {
        return null;
    }

    return (
        <div style={ { width: '70%', display: 'flex', flexWrap: 'wrap', gap: '20px' } }>
            {
                images[ 0 ].map( ( { id, url, label } ) => (
                    <div key={ id }>
                        <div style={ { width: '200px', height: '150px', backgroundImage: `url(${ url })`, backgroundSize: 'cover' } }></div>
                        <div style={ { display: 'flex', justifyContent: 'space-between', marginTop: '10px' } }>
                            <label>{ label }</label>
                            <button>Tag</button>
                        </div>
                    </div>
                ) )
            }
        </div>
    );
}