
export default function TagCard( { name, color } ) {
    return (
        <div style={ { width: '200px', border: '1px solid black', padding: '20px', backgroundColor: color } }>
            <header>{ name }</header>
        </div>
    );
}