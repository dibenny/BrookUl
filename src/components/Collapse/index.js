import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './index.less';

const CollapseItem = ({ code, defaultActive, onChange, size, ghost }) => {
  const [isOpen, setIsOpen] = useState(defaultActive);
  console.log('ghost', ghost);
  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onChange) {
      onChange(code.key, !isOpen);
    }
  };
  console.log('collapse_iterm_size_${size}', `collapse_iterm_size_${size}`);
  return (
    <div
      className={ghost ? 'collapse_main_ghost' : `collapse_main`}
      onClick={handleClick}
    >
      <div
        className={
          size ? `collapse_iterm_size_${size}` : 'collapse_iterm_size_middle'
        }
      >
        {!isOpen ? (
          <RightOutlined className="icon_mr_10" />
        ) : (
          <DownOutlined className="icon_mr_10" />
        )}
        {code?.label || '-'}
      </div>
      <div>
        {isOpen && <div className="child_content">{code.children}</div>}
      </div>
    </div>
  );
};

function Collapse({ items, defaultActiveKey, onChange, ghost = false }) {
  return (
    <>
      {items.map((code, key) => (
        <CollapseItem
          key={code.key || key}
          code={code}
          ghost={ghost}
          defaultActive={defaultActiveKey?.includes(code.key)}
          onChange={onChange}
          size={code?.size}
        />
      ))}
    </>
  );
}
export default Collapse;
