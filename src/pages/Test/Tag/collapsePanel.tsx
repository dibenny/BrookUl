import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './styles.less';

function CollapsePanel({ title, extra, children }: any) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (children) {
      setIsOpen(true);
    }
  }, [children]);
  return (
    <div className="panel-container">
      <div className="panel-head">
        <div className="panel-head-left" onClick={() => setIsOpen(!isOpen)}>
          <div>
            {!isOpen ? <PlusSquareOutlined /> : <MinusSquareOutlined />}
          </div>
          <div>{title}</div>
        </div>
        {extra && <div className="panel-head-right">{extra}</div>}
      </div>
      <div className="panel-content">{isOpen && <div>{children}</div>}</div>
    </div>
  );
}

export default CollapsePanel;