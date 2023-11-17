import React from 'react'
import { createRoot } from 'react-dom/client'
import styles from '@/styles/index.css?inline'
import antdStyle from 'antd/dist/antd.css?inline'

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

        const container = document.createElement('div');
        const formDiv = document.querySelector("form #prompt-textarea").closest('form');
        if(!formDiv) return;

        // var newDiv = document.createElement('div');
        // newDiv.id = 'chat-gpt-prompt-until-container';

        formDiv.appendChild(container);

        //document.body.appendChild(container)

        if (container) {
            container.id = rootId
            container.style.width = '50px'
            container.style.display = 'flex';
            container.style.alignItems = 'center';
           // container.style.position = 'absolute'
            container.style.zIndex = '2147483666'
            container.style.flexDirection = 'column';
            container.style.justifyContent = 'end';
            container.style.marginBottom = '7px'
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
                        <style>{antdStyle.toString()}</style>
                        <style>{styles.toString()}</style>
                       <div id="chat-gpt-prompt-container" className='fixed'></div>
                       <App root={container.shadowRoot}/>
                    </AntdStyleProvider>
                </>
            </React.StrictMode>
        )
    } catch (error) {
        console.error('Error Injecting React', error)
    }
}

// const injectStyle = () => {
//     const component = document.getElementById('chatgpt-prompt-util'),
//     style = document.createElement('style');
//     component.insertAdjacentElement('beforebegin',style);
    
//     style.appendChild(document.createTextNode(antdStyle.toString()));
// }

injectReact(ROOT_ID)
