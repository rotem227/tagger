import styled, { css } from "styled-components";

const sizeMap = {
    xs: [ '2', '4' ],
    sm: [ '4', '8' ],
    md: [ '8', '12' ],
    lg: [ '12', '16' ],
};

const Input = styled.input`
    ${ ( { theme, size } ) => css`
        border-radius: 4px;
        border: 1px solid ${ theme.color.primary.main };
        font-size: ${ theme.font.size[ size ] };
        padding: ${ theme.spacing[ sizeMap[ size ][ 0 ] ] } ${ theme.spacing[ sizeMap[ size ][ 1 ] ] };
    ` }
`;

export default Input;

Input.defaultProps = {
    size: 'md',
};