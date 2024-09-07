import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { Input, Space, message, Tabs } from 'antd';
import UserBehaviorChecker from './components/BehaviorPage';
import './styles.less';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const basic = forwardRef((props: any, ref: any) => {
  const foremRef = useRef<any[]>([]);
  const tagRuleRef = useRef(null);
  const [data, setData] = useState<any>([]);
  const initialItems = [
    {
      label: '标签一',
      children: (
        <div className="box-wrap">
          <Space>
            <span style={{ marginLeft: '10px' }}>标签名字: </span>
            <Input
              placeholder="输入标签名字"
              onChange={(e: any) => (tagRuleRef.current = e.target.value)}
            />
          </Space>
          <div style={{ marginLeft: '10px', flex: 1 }}>
            <UserBehaviorChecker
              title="标签条件"
              ref={(r: any): any => {
                if (r) {
                  foremRef.current.push(r);
                }
              }}
              setItems={setData}
              items={props.items}
            />
          </div>
        </div>
      ),
      key: '1'
    }
  ];
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: '新标签',
      children: (
        <div className="box-wrap">
          <Space>
            <span style={{ marginLeft: '10px' }}>标签名字: </span>
            <Input
              placeholder="输入标签名字"
              onChange={(e: any) => (tagRuleRef.current = e.target.value)}
            />
          </Space>
          <div style={{ marginLeft: '10px', flex: 1 }}>
            <UserBehaviorChecker
              title="标签条件"
              ref={(r: any): any => {
                if (r) {
                  foremRef.current.push(r);
                }
              }}
              setItems={setData}
              items={props.items}
            />
          </div>
        </div>
      ),
      key: newActiveKey
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter(item => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  // 控制且或关系的字段输出
  const lineFun = (andOf: undefined | string, length: number): string => {
    if (andOf) {
      if (length <= 1) {
        return 'condition';
      }
      return andOf;
    }
    return 'condition';
  };

  // 整合数据
  function processObjectFun(obj: any) {
    obj.metricType = lineFun(data.metricType, obj.children.length);
    obj.children.forEach((parent: any) => {
      const parent_children = parent?.children;
      const parent_children_first =
        parent_children?.length > 0 ? parent_children[0] : [];
      const { backFiled = '', relateFiled = '' } = parent_children_first;
      parent.metricType = lineFun(parent.metricType, parent.children.length);
      parent.nodeType = lineFun(obj.metricType, obj.children.length);
      parent.backFiled = backFiled;
      parent.relateFiled = relateFiled;

      parent_children?.forEach((child: any) => {
        const {
          metricType = '',
          metric,
          showTimeSelector,
          timeValue,
          tableName
        } = child;
        child.metricType = lineFun(metricType, metric?.length);
        child.nodeType = lineFun(parent?.metricType, parent?.children?.length);
        if (showTimeSelector) {
          const { startTime, endTime } = timeValue;
          child.tableName = tableName
            .replace('${startTime}', startTime)
            .replace('${endTime}', endTime);
        }
        if (metric?.length > 0) {
          metric.forEach((metricChild: any) => {
            if (['is null', 'is not null'].includes(metricChild.operator)) {
              metricChild.value = '';
            }
          });
        }
      });
    });
    return obj;
  }

  const handleGetFormData = () => {
    if (!tagRuleRef?.current) {
      return message.warning('标签名字必填！');
    }
    if (Array.isArray(data) && data?.length === 0) {
      return message.warning('标签条件必填！');
    }
    let { backFiled = '', relateFiled = '' } = data[0];
    const outputObject = {
      children: [...data.filter((item: any) => typeof item !== 'function')],
      nodeType: 'condition',
      backFiled,
      relateFiled
    };
    let _newOutputObject; // 遍历处理层级关系
    _newOutputObject = {
      tagRule: processObjectFun(outputObject),
      tagValueCn: tagRuleRef?.current
    };
    return _newOutputObject;
  };

  useImperativeHandle(ref, () => ({
    getTagFormData() {
      return handleGetFormData();
    }
  }));

  return (
    <>
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </>
  );
});

export default basic;