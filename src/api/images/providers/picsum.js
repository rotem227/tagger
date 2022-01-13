import ApiBase from '../../api-base';

export default class Picsum extends ApiBase {
    getEndpoint( config = {} ) {
        const { limit = 100 } = config;
        
        return `https://picsum.photos/v2/list?limit=${ limit }`;
    }
}