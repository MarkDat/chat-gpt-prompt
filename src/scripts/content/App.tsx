import { FileTextOutlined } from '@ant-design/icons'
import { Alert, Button, Popover, notification } from 'antd'
import React, { useEffect, useState } from 'react'
interface IProps {
    root: ShadowRoot
}
const App = (prop: IProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification()
    const [textAreaElementSize, setTextAreaElementSize] = useState({
        width: 0,
        height: 0
    })

    // useEffect(() => {
    //     const resizeObserver = new ResizeObserver(entries => {
    //         // const { left, top } = entries[0].contentRect;
    //         const { inlineSize: width, blockSize: height } = entries[0].borderBoxSize[0]

    //         setTextAreaElementSize({ width, height })
    //     })

    //     resizeObserver.observe(document.getElementById('prompt-textarea'))

    //     return () => resizeObserver.disconnect()
    // }, [])

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

    const text = <span>Title</span>

    const content = (
        <div>
            <p>ContentKOKOKOKO</p>
            <p>Content</p>
        </div>
    )

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
                    content={content}
                    getPopupContainer={getPopupContainer}
                >
                    <Button className="rounded-lg" onClick={() => console.log('haha')}>
                        <FileTextOutlined />
                    </Button>
                </Popover>
            </div>
        </>
    )
}

export default App
