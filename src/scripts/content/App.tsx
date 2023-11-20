import { FileTextOutlined, PlusCircleOutlined } from '@ant-design/icons'
import {
    MouseSensor,
    PointerActivationConstraint,
    TouchSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import { Button, Input, Layout, MenuProps, Popover, notification } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Title from 'antd/lib/typography/Title'
import React, { useEffect, useReducer, useState } from 'react'
import SortableList from './SortableList'
import { addItem, chooseGroup, deleteItem, movePosition, updateItems } from './reducers/action'
import { promptReducer } from './reducers/promptReducer'

type MenuItem = Required<MenuProps>['items'][number]
interface IProps {
    root: ShadowRoot
}
const App = (prop: IProps) => {
    const [groups, groupDispatch] = useReducer(promptReducer, [
        {
            id: 1,
            content: 'line 1',
            current: true
        },
        {
            id: 2,
            content: 'line 2'
        },
        {
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
        },
        {
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
        }
    ])

    const [items, dispatch] = useReducer(promptReducer, [
        {
            id: 1,
            content: 'line 1'
        },
        {
            id: 2,
            content: 'line 2'
        },
        {
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
        },
        {
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
        }
    ])

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: { delay: 100 } as PointerActivationConstraint
        }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 100 } as PointerActivationConstraint
        })
    )

    const [isGroupAdd, setIsGroupAdd] = useState(false)
    const [isPromptAdd, setIsPromptAdd] = useState(false)

    const menuItems: MenuItem[] = [
        { key: '1', label: 'Triết gia ba lo te' },
        { key: '2', label: 'Code' },
        { key: '3', label: 'Giáo dục' }
    ]

    const [isOpen, setIsOpen] = useState(false)
    const [groupContentTmp, setGroupContentTmp] = useState('')
    const [promptTmp, setPromptTmp] = useState('')
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
        const { active, over } = event

        if (active.id !== over.id) {
            dispatch(
                movePosition({
                    activeId: active.id,
                    overId: over.id
                })
            )
        }
    }

    function handleGroupDragEnd(event) {
        const { active, over } = event

        if (active.id !== over.id) {
            groupDispatch(
                movePosition({
                    activeId: active.id,
                    overId: over.id
                })
            )
        }
    }

    const onGroupValueChanged = (id, newContent) => {
        groupDispatch(updateItems({ id, newContent }))
    }

    const onItemValueChanged = (id, newContent) => {
        dispatch(updateItems({ id, newContent }))
    }

    const onItemDeleted = id => {
        dispatch(deleteItem({ id }))
    }

    const onGroupItemDeleted = id => {
        groupDispatch(deleteItem({ id }))
    }

    const contentPopover = () => {
        return (
            <>
                <div className="w-[40rem] h-[30rem] overflow-hidden">
                    <Layout className="bg-transparent h-[inherit]">
                        <div className="flex flex-row justify-between">
                            <div className="flex justify-between">
                                <Title className="hover:text-[#1890ff] mr-2" level={4}>
                                    Nhóm
                                </Title>
                                <div
                                    className="cursor-pointer text-xl hover:text-[#1890ff]"
                                    onClick={() => setIsGroupAdd(true)}
                                >
                                    <PlusCircleOutlined />
                                </div>
                            </div>
                            <div className="flex justify-between mb-1 w-64">
                                <Input
                                    placeholder="Tìm kiếm prompt có sẵn"
                                    className="mr-1 rounded"
                                />
                                <div
                                    className="cursor-pointer text-xl hover:text-[#1890ff]"
                                    onClick={() => setIsPromptAdd(true)}
                                >
                                    <PlusCircleOutlined />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row overflow-hidden">
                            <Layout className="grow-0 shrink-0 w-40 bg-transparent pr-1 hover:overflow-x-hidden hover:overflow-y-auto">
                                {isGroupAdd && (
                                    <>
                                        <div
                                            className="prompt-card rounded mb-1.5 border p-1 bg-white"
                                            onBlur={() => {
                                                if(!!groupContentTmp) {
                                                    groupDispatch(addItem({ content: groupContentTmp }))
                                                    setGroupContentTmp('')
                                                }

                                                setIsGroupAdd(false)
                                            }}
                                        >
                                            <TextArea
                                                showCount
                                                maxLength={200}
                                                value={groupContentTmp}
                                                onChange={e => setGroupContentTmp(e.target.value)}
                                                placeholder="Nhập nội dung"
                                                style={{ height: 120, resize: 'none' }}
                                                autoFocus={true}
                                            />
                                        </div>
                                    </>
                                )}
                                <SortableList
                                    items={groups}
                                    handleDragEnd={handleGroupDragEnd}
                                    onItemValueChanged={onGroupValueChanged}
                                    onItemDeleted={onGroupItemDeleted}
                                    onItemClicked={(id) => groupDispatch(chooseGroup({id}))}
                                    isGroup={true}
                                />
                            </Layout>
                            <Layout className="bg-transparent pr-1.5 hover:overflow-x-hidden hover:overflow-y-auto">
                                {isPromptAdd && (
                                    <>
                                        <div
                                            className="prompt-card rounded mb-1.5 border p-1 bg-white"
                                            onBlur={() => {
                                                if(!!promptTmp) {
                                                    dispatch(addItem({ content: promptTmp }))
                                                    setPromptTmp('')
                                                }

                                                setIsPromptAdd(false)
                                            }}
                                        >
                                            <TextArea
                                                showCount
                                                maxLength={200}
                                                value={promptTmp}
                                                onChange={e => setPromptTmp(e.target.value)}
                                                placeholder="Nhập nội dung"
                                                style={{ height: 120, resize: 'none' }}
                                                autoFocus={true}
                                            />
                                        </div>
                                    </>
                                )}
                                <SortableList
                                    items={items}
                                    handleDragEnd={handleDragEnd}
                                    onItemValueChanged={onItemValueChanged}
                                    onItemDeleted={onItemDeleted}
                                    onItemClicked={(e) => console.log('item '+ e)}
                                />
                            </Layout>
                        </div>
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
