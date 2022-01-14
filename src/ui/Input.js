import styled, { css } from "styled-components";

const Input = styled.input`
    ${ ( { theme } ) => css`
        border-radius: 4px;
        border: 1px solid ${ theme.color.primary.main };
        font-size: ${ theme.font.size.md };
        padding: ${ theme.spacing[ '8' ] } ${ theme.spacing[ '16' ] };
    ` }
`;

export default Input;