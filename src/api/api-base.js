export default class ApiBase {
    getData() {
        return fetch( this.getEndpoint() )
            .then( ( res ) => res.json() )
            .then( ( res ) => this.handleData( res ) );
    }

    getEndpoint() {
        return '';
    }

    handleData( data ) {
        return data;
    }
}