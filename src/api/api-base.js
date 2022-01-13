const initialConfig = {
    limit: 50,
};

export default class ApiBase {
    getData() {
        return fetch( this.getEndpoint() )
            .then( ( res ) => res.json() )
            .then( ( res ) => this.normalizeData( res ) );
    }

    getEndpoint() {
        return '';
    }

    normalizeData( data ) {
        return data;
    }

    get config() {
        return this._config;
    }

    set config( data ) {
        this._config = {
            ...this._config,
            ...data,
        };
    }

    constructor( config = {} ) {
        this._config = {
            ...initialConfig,
            ...config,
        };
    }
}