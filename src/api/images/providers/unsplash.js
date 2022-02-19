
import ApiBase from '../../api-base';

export default class Unsplash extends ApiBase {
    getEndpoint() {
        console.log( 'this.config.query', this.config.query );
        return `https://api.unsplash.com/search/photos/?per_page=${ this.config.limit }&query=${ this.config.query }&client_id=dHHFqL8sRivc2Og0s9fGLWnoH38elMurwTnJZzB5Yb0`;
    }
    
    getName() {
        return 'Unsplash';
    }

    normalizeData( data ) {
        data = data.results;

        return data.map( ( { id, urls, user, links } ) => {
            return {
                id,
                url: urls.regular,
                label: user.username,
                provider: this.getName(),
                providerUrl: links.html,
                downloadUrl: urls.full,
            };
        } );
    }
} 