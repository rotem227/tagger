import styled, { css } from 'styled-components';

const Heading = styled.h1`
    font-weight: bold;
    margin: 0;

    ${ ( { theme, variant, color } ) => css`
        color: ${ theme.color[ color ].main };
        font-size: ${ theme.font.size[ variant ] };
    ` }
`;

Heading.defaultProps = {
    color: 'primary',
    variant: 'lg',
};

export default Heading;