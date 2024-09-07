import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.less';

const Tabs = ({ iterm, onAddTab, onDeleteTab, closable = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const handleAddTab = () => {
    onAddTab();
  };

  const handleDeleteTab = (index) => {
    onDeleteTab(index);
  };

  return (
    <div className="tabs-container">
      <div className="tab-list-container">
        <div className="tab-list">
          {iterm.map((tab, index) => {
            console.log(
              'tab',
              tab?.tabFooter,
              //   Object.prototype.toString.call(tab?.tabFooter),
            );
            return (
              <>
                <button
                  key={index}
                  className={`tab ${
                    index === activeIndex ? 'active' : ''
                  } tab-active-button df-row`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab?.icon && (
                    <span className="mt-right-10">{tab?.icon}</span>
                  )}
                  {tab.label}
                  {closable && (
                    <CloseOutlined
                      className="tab-list-delete"
                      onClick={(e) => {
                        e.stopPropagation(); // 阻止点击事件冒泡
                        handleDeleteTab(index);
                      }}
                    />
                  )}
                  {tab?.tabFooter && (
                    <span className="mt-left-5">
                      {' '}
                      {typeof tab.tabFooter === 'function'
                        ? tab.tabFooter()
                        : tab.tabFooter}
                    </span>
                  )}
                </button>
              </>
            );
          })}
          {closable && (
            <PlusOutlined className="add-tab-button" onClick={handleAddTab} />
          )}
        </div>
      </div>
      <div className="tab-content">{iterm[activeIndex]?.content}</div>
    </div>
  );
};

export default Tabs;
