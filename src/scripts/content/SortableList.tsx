import { DndContext, MouseSensor, PointerActivationConstraint, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import React, { memo } from 'react';
import { SortableItem } from './SortableItem';

function SortableList(props) {

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {delay: 100} as PointerActivationConstraint,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {delay: 100} as PointerActivationConstraint,
        })
    )

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={props.handleDragEnd}
            >
                <SortableContext items={props.items}>
                    {props.items.map(item => (
                        <SortableItem
                            key={item.id}
                            item={item}
                            onItemValueChanged={props.onItemValueChanged}
                            onItemDeleted={props.onItemDeleted}
                            onItemClicked={props.onItemClicked}
                            isGroup={props.isGroup}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </>
    )
}

export default memo(SortableList);