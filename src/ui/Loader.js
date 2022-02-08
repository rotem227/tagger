import styled, { css } from 'styled-components';

const Loader = styled.div.withConfig( { shouldForwardProp: ( prop ) => ! [ 'color', 'centered' ].includes( prop ) } )`
    width: 50px;
    height: 50px;

    @keyframes rotation {
        from { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
        to { transform: translateX(-50%) translateY(-50%) rotate(359deg); }
    }

    ${ ( { theme, color } ) => css`
        &:before {
            --test: var(--rotem);
            color: ${ theme.color[ color ].main };
            content: "↻";
            font-size: 50px;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            animation: rotation 2s infinite linear;
        }
    ` }

    ${ ( { centered } ) => centered && css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 99;
    ` }
`;

Loader.defaultProps = {
    centered: true,
    color: 'primary',
};

export default Loader;