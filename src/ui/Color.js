import styled, { css } from "styled-components";

const Color = styled.input.attrs( { type: 'color' } )`
    ${ ( { theme } ) => css`
        border-radius: 4px;
        border: 1px solid ${ theme.color.primary.main };
        padding: ${ theme.spacing[ '4' ] };
        width: 36px;
        height: 36px;
    ` }
`;

export default Color;