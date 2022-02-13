import styled, { css } from "styled-components";

const Input = styled.input`
    ${ ( { theme } ) => css`
        border-radius: 4px;
        border: 1px solid ${ theme.color.primary.main };
        font-size: ${ theme.font.size.md };
        padding: ${ theme.spacing[ '4' ] } ${ theme.spacing[ '8' ] };
    ` }
`;

export default Input;