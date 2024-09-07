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
