import { FileTextOutlined } from '@ant-design/icons'
import { Alert, Button, Layout, List, Menu, MenuProps, Popover, Space, notification } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import { Content, Header } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number];
interface IProps {
    root: ShadowRoot
}
const App = (prop: IProps) => {
    const data = [
        {
            title: 'Ant Design Title 1'
        },
        {
            title: 'Ant Design Title 2'
        },
        {
            title: 'Ant Design Title 3'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        },
        {
            title: 'Ant Design Title 4'
        }
    ]
    
    const menuItems: MenuItem[] = [
        {key: '1', label: 'Triết gia'},
        {key: '2', label: 'Code'},
        {key: '3', label: 'Giáo dục'}
    ];  

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

    const contentPopover = () => {
        return (
            <>
                <div className="w-[40rem] h-[35rem] overflow-hidden">
                    <Space
                        direction="vertical"
                        style={{ width: '100%', height: '100%' }}
                        size={[0, 48]}
                    >
                        <Layout className='flex flex-row h-[35rem] bg-transparent gap-2.5'>
                            <Layout className='grow-0 shrink-0 basis-40	overflow-auto bg-transparent'>
                                <Menu
                                    className='h-full'
                                    mode="inline"
                                    defaultActiveFirst={true}
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['1']}
                                    onSelect={(e) => console.log(e)}
                                    items={menuItems}
                                />
                            </Layout>
                            <Layout className='bg-transparent'> 
                                <List
                                    className='overflow-auto'
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={(item, index) => (
                                        <List.Item className='cursor-pointer'>
                                            <List.Item.Meta
                                                title={
                                                    <a href="https://ant.design">{item.title}</a>
                                                }
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Layout>
                        </Layout>
                    </Space>
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
            {/* className="fixed bottom-0 right-0 p-4" */}
            {/* {isOpen && (
                <div
                    id="chatgpt-prompt-util"
                    className="relative" // box-content	overflow-hidden	pointer-events-none	
                    style={{
                        width: textAreaElementSize.width,
                        height: textAreaElementSize.height
                    }}
                >
                    <Popover
                        placement="topRight"
                        title={text}
                        content={content}
                        getPopupContainer={getPopupContainer}
                    >
                        <div className="absolute bg-red-500">
                            <Button onClick={() => console.log('haha')}>TR</Button>
                        </div>
                    </Popover>
                </div>
            )} */}
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
