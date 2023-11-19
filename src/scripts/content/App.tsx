import { FileTextOutlined } from '@ant-design/icons'
import { DndContext, KeyboardSensor, MouseSensor, PointerActivationConstraint, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Button, Layout, Menu, MenuProps, Popover, notification } from 'antd'
import React, { useEffect, useReducer, useState } from 'react'
import { SortableItem } from './SortableItem'
import { contentReducer } from './reducers/contentReducer'
import { deleteItem, movePosition, updateItems } from './reducers/action'

type MenuItem = Required<MenuProps>['items'][number]
interface IProps {
    root: ShadowRoot
}
const App = (prop: IProps) => {

    const [items, dispatch] = useReducer(
        contentReducer,
        [{
            id: 1,
            content: 'line 1'
        }, {
            id: 2,
            content: 'line 2'
        }, {
            id: 3,
            content: 'line 3'
        },
        {
            id: 4,
            content: 'line 3'
        },
        {
            id: 5,
            content: 'line 3'
        },{
            id: 6,
            content: 'line 3'
        },
        {
            id: 7,
            content: 'line 3'
        },
        {
            id: 8,
            content: 'line 3'
        },
        {
            id: 9,
            content: 'line 3'
        }]
    );

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {delay: 100} as PointerActivationConstraint,
        }),
        useSensor(TouchSensor, {
            activationConstraint: {delay: 100} as PointerActivationConstraint,
        })
    )

    const menuItems: MenuItem[] = [
        { key: '1', label: 'Triết gia ba lo te' },
        { key: '2', label: 'Code' },
        { key: '3', label: 'Giáo dục' }
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const [textAreaElementSize, setTextAreaElementSize] = useState({
        width: 0,
        height: 0
    })

    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!')
            }
        })
    }

    const toggleIsOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        console.log('Gimme: App.tsx')
        setIsOpen(true)
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log('Gimme: Message Received', request, sender, sendResponse)

            const textArea = document.getElementById('prompt-textarea') as HTMLTextAreaElement
            textArea.value = 'oh my god'
        })
    }, [])

    const text = <span>Prompt list</span>

    function handleDragEnd(event) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
            dispatch(movePosition({
                activeId: active.id,
                overId: over.id
            }));
        }
      }

    const onItemValueChanged = (id, newContent) => {
        dispatch(updateItems({ id, newContent}));
    }

    const onItemDeleted = (id) => {
        dispatch(deleteItem({ id }));
    }

    const contentPopover = () => {
        return (
            <>
                <div className="w-[40rem] h-[30rem] overflow-hidden">
                    <Layout className="flex flex-row h-[35rem] bg-transparent gap-2.5 h-[inherit]">
                        <Layout className="grow-0 shrink-0 basis-40	overflow-y-auto bg-transparent">
                            <Button type="dashed">Tạo nhóm</Button>
                            <Menu
                                className="h-full"
                                mode="inline"
                                defaultActiveFirst={true}
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['1']}
                                onSelect={e => console.log(e)}
                                items={menuItems}
                            />
                        </Layout>
                        <Layout className="bg-transparent overflow-y-auto overflow-x-hidden pr-1.5">
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd} 
                            >
                                <SortableContext items={items} >
                                    {items.map(item => (
                                        <SortableItem key={item.id} item={item} onItemValueChanged={onItemValueChanged} onItemDeleted={onItemDeleted}/>
                                    ))}
                                </SortableContext>
                            </DndContext>
                        </Layout>
                    </Layout>
                </div>
            </>
        )
    }

    const getPopupContainer = triggerNode => {
        // You can return the desired parent node here
        console.log(prop.root)

        return prop.root.getElementById('chat-gpt-prompt-container')
    }

    return (
        <>
            <div id="chatgpt-prompt-util">
                <Popover
                    placement="topRight"
                    title={text}
                    content={contentPopover}
                    getPopupContainer={getPopupContainer}
                    open={true}
                >
                    <Button
                        className="rounded-lg bg-white flex items-center"
                        size={'large'}
                        onClick={() => console.log('haha')}
                    >
                        <FileTextOutlined />
                    </Button>
                </Popover>
            </div>
        </>
    )
}

export default App
