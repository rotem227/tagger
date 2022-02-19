import styled, { css } from 'styled-components';

const adaptAttrs = ( { url, newWindow, onClick } ) => {
    return {
        href: url || null,
        target: newWindow ? '_blank' : null,
    };
};

const InlineLink = styled.a.attrs( adaptAttrs )`
    cursor: pointer;

    ${ ( { theme, variant, color } ) => css`
        color: ${ theme.color[ color ].main };
        font-size: ${ theme.font.size[ variant ] };
    ` }

    ${ ( { underline } ) => {
        switch( underline ) {
            case 'hover':
                return 'text-decoration: none; &:hover { text-decoration: underline; }';    
            case 'none': {
                return 'text-decoration: none;';
            }    
        }
    } }
`;

InlineLink.defaultProps = {
    color: 'primary',
    variant: 'md',
    underline: 'always',
};

export default InlineLink;