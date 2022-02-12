
import { useCallback } from 'react';

import styled, { css } from 'styled-components';

import useTags from '../../hooks/use-tags';
import useClassifier from '../../hooks/use-classifier';

import AddCard from './AddCard';
import TagCard from './TagCard';

import Flex from '../../ui/Flex';

const StyledWrapper = styled( Flex )`
    overflow-x: auto;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    
    ${ ( { theme } ) => css`
        background-color: ${ theme.color.disabled.light };
        border-top: 1px solid ${ theme.color.disabled.dark };
        padding: ${ theme.spacing[ '16' ] };
    ` }
`;

export default function Tags() {
    const { tags, removeTag, renameTag } = useTags();
    
    const { renameCategory } = useClassifier();

    const handleRemove = useCallback( ( index ) => removeTag( index ), [] );

    const handleRename = useCallback( ( { index, oldName, newName } ) => {
        renameTag( index, newName );

        renameCategory( oldName, newName );
    }, [] );

    return (
        <StyledWrapper>
            <Flex gap="20px">
                <AddCard />

                <Flex direction="row-reverse" gap="20px">
                    {
                        tags.map( ( { name, color, contrast, images }, index ) => {
                            return (
                                <TagCard
                                    key={ name }
                                    name={ name }
                                    color={ color }
                                    contrast={ contrast }
                                    images={ images }
                                    index={ index }
                                    onRemove={ handleRemove }
                                    onRename={ handleRename }
                                />
                            );
                        } )
                    }
                </Flex>
            </Flex>
        </StyledWrapper>
    );
}