import ApiBase from '../../api-base';

export default class Pixabay extends ApiBase {
    getEndpoint() {
        return `https://pixabay.com/api/?key=16461786-3d841972030704fc938433708&min_width=300&per_page=${ this.config.limit }&q=${ this.config.query }`;
    }

    getName() {
        return 'Pixabay';
    }

    normalizeData( data ) {
        data = data.hits;

        return data.map( ( { id, user, largeImageURL, pageURL } ) => {
            return {
                id,
                url: largeImageURL,
                label: user,
                provider: this.getName(),
                providerUrl: pageURL,
                downloadUrl: largeImageURL,
            };
        } );
    }
} 