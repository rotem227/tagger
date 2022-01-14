import styled, { css } from 'styled-components';

const Text = styled.p`
    ${ ( { theme, variant, color } ) => css`
        color: ${ theme.color[ color ].main };
        font-size: ${ theme.font.size[ variant ] };
    ` }
`;

Text.defaultProps = {
    color: 'primary',
    variant: 'md',
};

export default Text;