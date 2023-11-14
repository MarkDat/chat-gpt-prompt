import React from 'react'
import { createRoot } from 'react-dom/client'
import styles from '@/styles/index.css?inline'
// import antdStyle from 'antd/dist/antd.css?inline'

import { StyleProvider as AntdStyleProvider } from '@ant-design/cssinjs'

import App from './App'

const isProduction: boolean = process.env.NODE_ENV === 'production'
const ROOT_ID = 'RENAME_ME_IF_YOU_WANT'

const injectReact = (rootId: string): void => {
    try {
        //injectStyle();

        // document.addEventListener("focusin", function (event) {
        //     console.log('hahaha', event);
            
        //   });

        const container = document.createElement('div')
        document.body.appendChild(container)

        if (container) {
            container.id = rootId
            container.style.position = 'inherit'
            container.style.zIndex = '2147483666'
        }

        if (isProduction) {
            console.log('Production mode 🚀. Adding Shadow DOM')
            container.attachShadow({ mode: 'open' })
        } else {
            console.log('Development mode 🛠')
        }

        const target: ShadowRoot | HTMLElement = isProduction ? container.shadowRoot! : container

        const root = createRoot(target!)

        root.render(
            <React.StrictMode>
                <>
                    <AntdStyleProvider container={container}>
                        {isProduction && <style>{styles.toString()}</style>}
                        {/* <style>{antdStyle.toString()}</style> */}
                        <App />
                    </AntdStyleProvider>
                </>
            </React.StrictMode>
        )
    } catch (error) {
        console.error('Error Injecting React', error)
    }
}

// const injectStyle = () => {
//     const head = document.head || document.getElementsByTagName('head')[0],
//     style = document.createElement('style');;
//     head.insertBefore(style, head.firstChild);
    
//     style.appendChild(document.createTextNode(antdStyle.toString()));
// }

injectReact(ROOT_ID)
