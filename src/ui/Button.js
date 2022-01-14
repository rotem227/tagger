import styled, { css } from 'styled-components';

const Button = styled.button`
    background-color: var(--ui-button-background-color);
    border: 2px solid var(--ui-button-border-color);  
    border-radius: 4px;
    color: var(--ui-button-color);
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s linear;

    ${ ( { theme, size } ) => css`
        font-size: ${ theme.font.size[ size ] };
        padding: ${ theme.spacing[ '8' ] } ${ theme.spacing[ '12' ] };
    ` }

    ${ ( { theme, variant, color } ) => {
        switch( variant ) {
            case 'contained':
                return css`
                    --ui-button-background-color: ${ theme.color[ color ].main };
                    --ui-button-border-color: ${ theme.color[ color ].main };
                    --ui-button-color: ${ theme.color[ color ].text };

                    &:hover {
                        --ui-button-background-color: ${ theme.color[ color ].dark };
                    }
                `;
            case 'outlined': 
                return css`
                    --ui-button-background-color: initial;
                    --ui-button-border-color: ${ theme.color[ color ].main };
                    --ui-button-color: ${ theme.color[ color ].main };

                    &:hover {
                        --ui-button-border-color: ${ theme.color[ color ].light };
                        --ui-button-color: ${ theme.color[ color ].light };
                    }
                `;
        }
    } }
`;

Button.defaultProps = {
    color: 'primary',
    variant: 'contained',
    size: 'md',
};

export default Button;