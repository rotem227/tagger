import styled, { css } from 'styled-components';

const Grid = styled.div`
    ${ ( props ) => css`
        --ui-grid-columns: ${ props.columns };

        display: grid;
        grid-template-columns: repeat(var(--ui-grid-columns), 1fr);
        gap: ${ props.gap };
    ` }
`;

Grid.defaultProps = {
    columns: 2,
    gap: '0px',
};

export default Grid;