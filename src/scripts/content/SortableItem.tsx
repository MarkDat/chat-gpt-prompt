import {
    DeleteTwoTone,
    EditTwoTone
} from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextArea from 'antd/lib/input/TextArea'
import React, { useEffect, useState } from 'react'

export function SortableItem(props) {
    const [isEditing, setIsEditting] = useState(false)
    const { item, isGroup } = props
    const { attributes, listeners, setNodeRef, transform, transition, isDragging, node } = useSortable({
        id: item.id,
        disabled: isEditing
    })
    const [contentTmp, setContentTmp] = useState(item.content)
    const normalCss = "prompt-card rounded mb-1.5 border p-1 bg-white ";
    const currentCss = 'prompt-card rounded mb-1.5 p-1 bg-cyan-100 border border-cyan-400 '

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const actionComponent = () => {
        return (
            <>
                {!isEditing ? <>
                        <div className="cursor-grab text-base" onClick={() => setIsEditting(true)}>
                            <EditTwoTone />
                        </div>
                        <div className="cursor-grab text-base" onClick={() => props.onItemDeleted(item.id)}>
                            <DeleteTwoTone twoToneColor={'red'} />
                        </div>
                    </> : <></>}
            </>
        )
    }

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='group'>
                <div className="action relative justify-end h-0 mr-1 gap-1 hidden group-hover:flex">
                    {actionComponent()}
                </div>
                <div
                    className={(!item.current ? normalCss : currentCss) + (isDragging ? 'bg-cyan-50 ' : ' ') + (isGroup ? 'min-h-[50px]' : 'min-h-[70px]')}
                    onClick={() => {
                        props.onItemClicked(item.id)
                    }}
                >
                    {isEditing ? (
                        <TextArea
                            showCount
                            maxLength={200}
                            value={contentTmp}
                            placeholder="Nhập nội dung"
                            onChange={e => setContentTmp(e.target.value)}
                            style={{ height: 150, resize: 'none' }}
                            autoFocus={true}
                            onBlur={() => {
                                props.onItemValueChanged(item.id, contentTmp)
                                setIsEditting(false)
                            }}
                        />
                    ) : (
                        item.content
                    )}
                </div>
            </div>
        </>
    )
}
