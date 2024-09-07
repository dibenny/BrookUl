使用实例

```jsx
import Tabs from '@/components/Tabs';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const App = () => {
  const [tabs, setTabs] = useState([
    {
      label: 'Tab 1',
      content: 'Content of Tab 1',
      icon: <PlusOutlined />,
      tabFooter: null,
    },
    {
      label: 'Tab 2',
      content: 'Content of Tab 2',
      tabFooter: () => <div>123</div>,
    },
  ]);

  const addTab = () => {
    setTabs([
      ...tabs,
      {
        label: `New Tab`,
        content: `New Tab ${tabs.length + 1}`,
      },
    ]);
  };

  const deleteTab = (index) => {
    const newTabs = [...tabs];
    newTabs.splice(index, 1);
    setTabs(newTabs);
  };

  return (
    <div>
      <Tabs
        iterm={tabs}
        onAddTab={addTab}
        onDeleteTab={deleteTab}
        closable={true}
      />
    </div>
  );
};

export default App;
```

|    参数     |                   解释 |  类型  |
| :---------: | ---------------------: | :----: |
|    iterm    |               标签列表 |  数组  |
|  onAddTab   |           添加标签事件 |  函数  |
| onDeleteTab |           删除标签事件 |  函数  |
|  closable   | 控制标签能否删除跟添加 | 布尔值 |

iterm

|   参数    |               解释 |  类型  |
| :-------: | -----------------: | :----: |
|   label   |           标签名称 | 字符串 |
|  content  |       标签展示内容 |   -    |
|   icon    |      标签左侧 icon |   -    |
| tabFooter | 标签右侧可添加内容 |  任意  |
