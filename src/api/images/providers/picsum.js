import ApiBase from '../../api-base';

export default class Picsum extends ApiBase {
    getEndpoint() {
        return `https://picsum.photos/v2/list?limit=${ this.config.limit }`;
    }

    normalizeData( data ) {
        console.log( 'data', data );
        return data.map( ( { download_url: url, author: label } ) => ( { url, label } ) );
    }
} 