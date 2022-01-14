
import { useState, useMemo, useCallback } from 'react';

import styled, { css } from 'styled-components';

import useTags from '../../hooks/use-tags';
import useClassifier from '../../hooks/use-classifier';

import Text from '../../ui/Text';

import ImageTagItem from './ImageTagItem';

const StyledWrapper = styled.div`
    border-radius: 2px;
    cursor: pointer;
    position: relative;

    ${ ( { theme } ) => css`
        border: 1px solid ${ theme.color.disabled.dark };
        padding: ${ theme.spacing[ '4' ] };
    ` }
`;

export default function ImageTag( { imageData } ) {
    const [ selected, setSelected ] = useState( {} );

    const [ isSelectMode, setIsSelectMode ] = useState( false );

    const { data, classify, getUsedTags } = useClassifier( imageData );
    
    const { tags } = useTags();

    const usedTags = getUsedTags( imageData.url );

    const availableTags = useMemo( () => tags.filter( ( { name } ) => ! usedTags[ name ] ), [ tags, data ] );

    const resetSelection = useCallback( () => {
        setIsSelectMode( false );

        setSelected( {} );
    }, [] );


    const handleApply = useCallback( () => {
        classify( Object.keys( selected ), imageData )

        resetSelection();
    }, [ selected ] );

    const handleSelect = useCallback( ( tagName ) => {
        if ( selected[ tagName ] ) {
            setSelected( ( prevState ) => {
                const stateData = { ...prevState };

                delete stateData[ tagName ];
                
                return stateData;
            } );
        } else {
            setSelected( ( prevState ) => ( { ...prevState, [ tagName ]: true } ) );
        }
    }, [] );

    if ( ! availableTags.length ) {
        return null;
    }

    return (
        <StyledWrapper onMouseMove={ () => setIsSelectMode( true ) }>
            <Text variant="sm">✐ TAG</Text>

            <ImageTagItem
                tags={ availableTags }
                selected={ selected }
                isSelectMode={ isSelectMode }
                onReset={ resetSelection }
                onSelect={ handleSelect }
                onApply={ handleApply }
            />
        </StyledWrapper>
    );
}