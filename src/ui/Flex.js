import styled, { css } from 'styled-components';

const Flex = styled.div.attrs( ( props ) => ( { wrap: props.wrap ? 'wrap' : 'noWrap' } ) )`
    ${ ( props ) => css`
        display: ${ props.inline ? 'inline-flex' : 'flex' };
        align-items: ${ props.alignItems };
        justify-content: ${ props.justifyContent };
        flex-direction: ${ props.direction };
        flex-wrap: ${ props.wrap };
        gap: ${ props.gap };
    ` }
`;

Flex.defaultProps = {
    inline: false,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    direction: 'row',
    gap: '0px',
};

export default Flex;