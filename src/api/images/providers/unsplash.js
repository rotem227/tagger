
import ApiBase from '../../api-base';

export default class Unsplash extends ApiBase {
    getEndpoint() {
        return `https://api.unsplash.com/search/photos/?per_page=${ this.config.limit }&query=Lion&client_id=dHHFqL8sRivc2Og0s9fGLWnoH38elMurwTnJZzB5Yb0`;
    }

    normalizeData( data ) {
        data = data.results;

        return data.map( ( { id, urls, user } ) => {
            return {
                id,
                url: urls.regular,
                label: user.username,
            };
        } );
    }
} 