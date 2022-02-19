import styled, { css } from 'styled-components';

const Loader = styled.div.withConfig( { shouldForwardProp: ( prop ) => ! [ 'color', 'centered' ].includes( prop ) } )`
    position: relative;

    @keyframes rotation {
        from { transform: translateX(-50%) translateY(-50%) rotate(0deg); }
        to { transform: translateX(-50%) translateY(-50%) rotate(359deg); }
    }

    ${ ( { theme, color, size } ) => css`
        width: ${ theme.font.size[ size ] };
        height: ${ theme.font.size[ size ] };

        &:before {
            content: "↻";
            color: ${ theme.color[ color ].main };
            font-size: ${ theme.font.size[ size ] };
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
    size: 'lg',
};

export default Loader;