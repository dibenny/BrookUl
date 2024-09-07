import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import CollapsePanel from '../../collapsePanel';
import Line from '../../line';
import '../common.less';
import ThreeLevel from './threeLevel';
import EDITJSON from './editJSON.json'

const UserAttributesChecker = (props: any, ref: any) => {
  const [items, setItems] = useState<any>(EDITJSON);
  console.log('items+items+items',JSON.stringify(items))
  const addItem = () => {
    items.push({
      alias: 'temp' + Date.now(),
      children: [{ alias: 'temp' + Date.now(), metric: [] }]
    });
    setItems([...items]);
  };

  const addSubItem = (parentKey: any, bool: boolean | undefined) => {
    const arry = items.map((item: any) => {
      if (item.alias === parentKey) {
        return {
          ...item,
          children: [
            ...item.children,
            {
              alias: 'temp' + Date.now(),
              metric: [],
              showTimeSelector: bool
            }
          ]
        };
      } else {
        return item;
      }
    });
    setItems(() => arry);
  };

  // 添加条件集数据联动
  const addDateLinkageChildren = (
    parentKey: any,
    subKey: any,
    subSubKey: any,
    type: string
  ) => {
    setItems(
      items.map((item: any) =>
        item.alias === parentKey
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.alias === subKey
                  ? {
                      ...subItem,
                      metric: subItem.metric.map((subItem: any) =>
                        subItem.alias === subSubKey
                          ? {
                              ...subItem,
                              componentType: type
                            }
                          : subItem
                      )
                    }
                  : subItem
              )
            }
          : item
      )
    );
  };

  // 添加条件集数据联动
  const operationField = (
    parentKey: any,
    subKey: any,
    subSubKey: any,
    type: string
  ) => {
    setItems(
      items.map((item: any) =>
        item.alias === parentKey
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.alias === subKey
                  ? {
                      ...subItem,
                      metric: subItem.metric.map((subItem: any) =>
                        subItem.alias === subSubKey
                          ? {
                              ...subItem,
                              componentType: type
                            }
                          : subItem
                      )
                    }
                  : subItem
              )
            }
          : item
      )
    );
  };
  useEffect(() => {
    props.setItems(items);
  }, [items]);

  const removeSubItem = (parentKey: any, subKey: any) => {
    setItems(
      items
        .map((item: any) =>
          item.alias === parentKey
            ? {
                ...item,
                children: item.children.filter(
                  (subItem: any) => subItem.alias !== subKey
                )
              }
            : item
        )
        .filter((subItems: any) => subItems.children.length !== 0)
    );
  };
  // 切换表数据的时候，清除对应的条件数据
  const checkArchiveNameRemoveSubItem = (parentKey: any, subKey: any) => {
    setItems(
      items.map((item: any) =>
        item.alias === parentKey
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.alias === subKey
                  ? {
                      ...subItem,
                      metric: []
                    }
                  : subItem
              )
            }
          : item
      )
    );
  };

  const addSubSubItem = (parentKey: any, subKey: any) => {
    setItems(
      items.map((item: any) =>
        item.alias === parentKey
          ? {
              ...item,
              children: item?.children?.map((subItem: any) =>
                subItem.alias === subKey
                  ? {
                      ...subItem,
                      metric: [
                        ...subItem?.metric,
                        { alias: 'temp' + Date.now() }
                      ]
                    }
                  : subItem
              )
            }
          : item
      )
    );
  };

  const removeSubSubItem = (parentKey: any, subKey: any, subSubKey: any) => {
    setItems(
      items.map((item: any) =>
        item.alias === parentKey
          ? {
              ...item,
              children: item.children.map((subItem: any) =>
                subItem.alias === subKey
                  ? {
                      ...subItem,
                      metric: subItem.metric.filter(
                        (subSubItem: any) => subSubItem.alias !== subSubKey
                      )
                    }
                  : subItem
              )
            }
          : item
      )
    );
  };

  return (
    <div className="container ">
      <CollapsePanel
        title={props?.title}
        extra={
          <Button type="primary" onClick={addItem}>
            新增单元
          </Button>
        }
      >
        <div className="box-wrap-common">
          {items?.length > 1 ? <Line value={items} name="rootType" /> : ''}
          <div>
            <div>
              {items?.map((item: any) => (
                <div key={item.key} className="box-wrap-common">
                  {item?.children.length > 1 ? (
                    <Line value={item} key={item.key} name="nodeType" />
                  ) : (
                    ''
                  )}
                  <div>
                    <ThreeLevel
                      surfaceData={props.surfaceData}
                      ref={ref}
                      removeSubItem={removeSubItem}
                      item={item}
                      items={items}
                      addSubSubItem={addSubSubItem}
                      removeSubSubItem={removeSubSubItem}
                      addSubItem={addSubItem}
                      addDateLinkageChildren={addDateLinkageChildren}
                      operationField={operationField}
                      checkArchiveNameRemoveSubItem={
                        checkArchiveNameRemoveSubItem
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CollapsePanel>
    </div>
  );
};

export default UserAttributesChecker;