import { Button, Radio, Tabs, TabsProps } from 'antd'
import { AndroidOutlined, BookOutlined } from '@ant-design/icons'
import React, { useMemo } from 'react'

const Popup = () => {
    const ItemLabel: React.FC<{ icon: any; title: string }> = ({ icon: ItemIcon, title }) => {
        return (
            <span>
                <ItemIcon />
                {title}
            </span>
        )
    }

    const items: TabsProps['items'] = [
        {
            label: <ItemLabel icon={BookOutlined} title="Tab 1" />,
            key: '1',
            children: <><Button type="primary" loading>
            Loading
            </Button></>
        },
        {
            label: <ItemLabel icon={AndroidOutlined} title="Tab 2" />,
            key: '2',
            children: `Tab 2`
        }
    ]

    return (
        <div>
            <Tabs defaultActiveKey="2" items={items} />
        </div>
    )
}

export default Popup
