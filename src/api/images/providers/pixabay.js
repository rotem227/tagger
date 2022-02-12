import ApiBase from '../../api-base';

export default class Pixabay extends ApiBase {
    getEndpoint() {
        return `https://pixabay.com/api/?key=16461786-3d841972030704fc938433708&min_width=300&per_page=${ this.config.limit }&q=Lion`;
    }

    normalizeData( data ) {
        data = data.hits;

        return data.map( ( { id, largeImageURL: url, user: label } ) => ( { id, url, label } ) );
    }
} 