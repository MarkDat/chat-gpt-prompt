import { Alert, Button, notification } from 'antd'
import React, { useEffect, useState } from 'react'

const App = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification()

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

            const textArea = document.getElementById('prompt-textarea') as HTMLTextAreaElement;
            textArea.value = 'oh my god'
        })
    }, [])

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-0 right-0 p-4">
                    <div className="inline-flex items-center justify-center h-16 rounded-full">
                        {/* {contextHolder}
                        <Button type="primary" onClick={openNotification}>
                            Open the notification box
                        </Button> */}
                    </div>
                </div>
            )}
        </>
    )
}

export default App
