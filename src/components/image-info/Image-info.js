import useDownloadImage from '../../hooks/use-download-image';

import Flex from '../../ui/Flex';
import InlineLink from '../../ui/inline-link';
import Loader from '../../ui/Loader';
import Text from '../../ui/Text';

export default function ImageInfo( { size, provider, providerUrl, downloadUrl, loaderSize } ) {
    const { download, loading } = useDownloadImage();
    
    const handleDownloadImage = ( e ) => {
        e.preventDefault();

        download( downloadUrl );
    };
    
    return (
        <Flex alignItems="flex-start" gap="5px">
            <InlineLink
                variant={ size }
                underline="hover"
                url={ providerUrl }
                newWindow
            >
                { provider }
            </InlineLink>
            
            <Text variant={ size } color="secondary">|</Text>
            
            {
               loading ?
                <Loader centered={ false } size={ loaderSize } /> :
                <InlineLink
                    variant={ size }
                    underline="hover"
                    onClick={ handleDownloadImage }
                >
                    Download
                </InlineLink>
            }
        </Flex>
    );
}

ImageInfo.defaultProps = {
    size: 'md',
    loaderSize: 'lg',
};