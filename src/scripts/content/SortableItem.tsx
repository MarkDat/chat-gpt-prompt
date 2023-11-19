import {
  DeleteTwoTone,
  EditTwoTone,
  SaveTwoTone
} from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TextArea from 'antd/lib/input/TextArea'
import React, { useState } from 'react'

export function SortableItem(props) {
    const [isEditing, setIsEditting] = useState(false)
    const { item } = props
    const { attributes, listeners, setNodeRef, transform, transition, data } = useSortable({
        id: item.id
    })
    const [contentTmp, setContentTmp] = useState(item.content)

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    const actionComponent = () => {
        return (
            <>
                {isEditing ? (
                    <>
                        <div
                            className="cursor-grab z-50 text-xl mr-2 mt-1"
                            onClick={() => {
                                props.onItemValueChanged(item.id, contentTmp)
                                setIsEditting(false)
                            }}
                        >
                            <SaveTwoTone />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="cursor-grab text-base" onClick={() => setIsEditting(true)}>
                            <EditTwoTone />
                        </div>
                        <div className="cursor-grab text-base" onClick={() => props.onItemDeleted(item.id)}>
                            <DeleteTwoTone twoToneColor={'red'} />
                        </div>
                    </>
                )}
            </>
        )
    }

    return (
        <>
            <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className="action flex relative justify-end h-0 mr-1 gap-1">
                    {actionComponent()}
                </div>
                <div
                    className="min-h-[50px] rounded mb-1.5 border p-1 bg-white"
                    onClick={() => console.log('tumlum')}
                >
                    {isEditing ? (
                        <TextArea
                            showCount
                            maxLength={200}
                            value={contentTmp}
                            placeholder="Nhập nội dung"
                            onChange={e => setContentTmp(e.target.value)}
                            style={{ height: 120, resize: 'none' }}
                        />
                    ) : (
                        item.content
                    )}
                </div>
            </div>
        </>
    )
}
