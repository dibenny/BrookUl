import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, InputNumber, DatePicker } from 'antd';
import type { TimeRangePickerProps } from 'antd';
import dataJSON from './data.json';
import Line from '../../line';
// import TimeSelectorPlus from '../TimeSelectorPlus';
import '../common.less';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const rangePresets: TimeRangePickerProps['presets'] = [
  { label: '过去7天', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '过去14天', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '过去30天', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '过去90天', value: [dayjs().add(-90, 'd'), dayjs()] }
];
const { Option } = Select;

const operatorType: any = {
  int: ['=', '>', '<', '<=', '>=', 'is null', 'is not null', 'between', 'in'],
  string: ['=', 'is null', 'is not null', 'in', '<>'],
  date: ['=', '>', '<', '<=', '>=', 'is null', 'is not null', 'between', '<>'],
  boolean: ['=', 'is null', 'is not null']
};

const ThreeLevel = forwardRef((props: any) => {
  const threeRef: any = useRef([]); // 存储每个子表单的引用
  const outsideRef: any = useRef([]); // 存储每个子表单的引用
  const [subSubItem, setSubSubItem] = useState({
    minValue: null,
    maxValue: null
  });
  console.log('subSubItem', subSubItem);
  const [fieldNameCheck, setFieldNameCheck] = useState<any>([]);
  const uniqueSubSubItems: any = [];
  const [subSubItemState, setSubSubItemState] = useState<any>(
    uniqueSubSubItems.map(() => ({
      componentType: null,
      operator: null,
      value: null,
      alias: ''
    }))
  );

  const {
    item,
    removeSubSubItem,
    addSubSubItem,
    removeSubItem,
    addSubItem,
    checkArchiveNameRemoveSubItem,
    addDateLinkageChildren,
    // surfaceData
  } = props;

  const tableNameTest: any[] = dataJSON?.map(code => ({
    label: code.archiveName,
    value: code.querySql,
    partitionKey: code.partitionKey
  }));
  // 设置区间值的方法
  const handleMinChange = (e: any, subItem: any) => {
    setSubSubItem(prevSubSubItem => {
      const newSubSubItem = { ...prevSubSubItem, minValue: e };
      if (newSubSubItem.minValue !== null && newSubSubItem.maxValue !== null) {
        subItem.value = `${newSubSubItem.minValue} and ${newSubSubItem.maxValue}`;
      }
      return newSubSubItem;
    });
  };

  // 设置区间值的方法
  const handleMaxChange = (e: any, subItem: any) => {
    setSubSubItem(prevSubSubItem => {
      const newSubSubItem = { ...prevSubSubItem, maxValue: e };
      if (newSubSubItem.minValue !== null && newSubSubItem.maxValue !== null) {
        subItem.value = `${newSubSubItem.minValue} and ${newSubSubItem.maxValue}`;
      }
      return newSubSubItem;
    });
  };

  // 选中数据表
  const onTableName = (val: number) => {
    const primaryData = dataJSON?.filter(
      (codes: any) => codes.querySql === val
    )?.[0];
    let arr = primaryData?.archiveFields.map((code: any) => ({
      label: code?.fieldName,
      value: code?.displayName,
      fieldType: code?.fieldType,
      querySql: primaryData?.querySql,
      partitionKey: primaryData.partitionKey,
      relateFiled: val
    }));
    setFieldNameCheck(arr);
  };

  //根据字段，操作符判断显示组件情况
  const operatorTypeFun = (type: any, operator: any, subSubItem: any) => {
    const commonInputProps = {
      style: { width: 80 },
      onChange: (e: any) => (subSubItem.value = e.target.value)
    };

    switch (type) {
      case 'int':
        if (['=', '>', '<', '<=', '>='].includes(operator)) {
          return (
            <Form.Item name="value">
              <Input placeholder="输入" {...commonInputProps} />
            </Form.Item>
          );
        } else if (operator === 'between') {
          return (
            <Form.Item name="value">
              <InputNumber
                placeholder="输入"
                min={0}
                max={200}
                style={{ width: 80 }}
                onChange={e => handleMinChange(e, subSubItem)}
              />
              <span style={{ margin: '0 10px' }}>~</span>
              <InputNumber
                placeholder="输入"
                min={0}
                max={200}
                style={{ width: 80 }}
                onChange={e => handleMaxChange(e, subSubItem)}
              />
            </Form.Item>
          );
        } else if (operator === 'in') {
          return (
            <Form.Item name="value">
              <Input placeholder="输入" {...commonInputProps} />
            </Form.Item>
          );
        }
        break;
      case 'string':
        if (['=', '<>'].includes(operator) || operator === 'in') {
          return (
            <Form.Item name="value">
              <Input placeholder="输入" {...commonInputProps} />
            </Form.Item>
          );
        }
        break;
      case 'date':
        if (['=', '>', '<', '<=', '>=', '<>'].includes(operator)) {
          return (
            <Form.Item name="value">
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={e => {
                  console.log(
                    'onChangeonChange',
                    e ? dayjs(e).format('YYYY-MM-DD HH:mm:ss') : ''
                  );
                  return (subSubItem.value = e
                    ? dayjs(e).format('YYYY-MM-DD HH:mm:ss')
                    : '');
                }}
              />
            </Form.Item>
          );
        } else if (operator === 'between') {
          return (
            <Form.Item name="value">
              <RangePicker
                presets={rangePresets}
                onChange={(e: any) => {
                  if (e) {
                    const [start, end] = e?.map((date: any) =>
                      dayjs(date).format('YYYY-MM-DD HH:mm:ss')
                    );
                    subSubItem.value = `${start} and ${end}`;
                  } else {
                    subSubItem.value = '';
                  }
                }}
              />
            </Form.Item>
          );
        }
        break;
      case 'boolean':
        if (operator === '=') {
          return (
            <Form.Item name="value">
              <Select
                style={{ width: 100 }}
                placeholder="输入"
                onChange={e => (subSubItem.value = e)}
              >
                {[
                  { value: 0, label: 'false' },
                  { value: 1, label: 'true' }
                ].map((code, key) => (
                  <Option key={key} value={code.value}>
                    {code.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleSelectChange = (
    componentType: any, //操作字段的类型
    e: any, //区间的范围
    subSubItem: any // 当前操作字段
  ) => {
    const component = operatorTypeFun(componentType, e, subSubItem);
    subSubItem.component = component;
    setSubSubItemState(Object.assign([], item));
  };


  useEffect(()=>{
    Object.values(outsideRef)?.map((code:any)=>{
      if(code?.setFieldsValue){
        code?.setFieldsValue({
          archiveName:  props?.item?.relateFiled
          
        });
      }
    })
    Object.keys(threeRef).map(refs=>{
      if(refs !== "current"){
        const index_ref = refs.split('_') 
        console.log('threeRef-threeRef',index_ref)
        const items = props?.item?.children[index_ref[0]].metric[index_ref[1]]
        handleSelectChange(items.componentType, items.operator, items)
        threeRef[refs].setFieldsValue({
          metricType: items.attrName,
          operator: items.operator,
          value: items.value
        })
      }
    })
  // ?.map((code:any)=>{
  //   if(code?.setFieldsValue){
      // props?.item?.children[]
  //     props?.item?.children?.map((codes:any,index:any)=>{
  //             codes?.metric?.map((item:any,key:any)=>{
  //             console.log('itemitemitem',codes)
              // handleSelectChange(item.componentType, item.operator, item)
              // code?.setFieldsValue({
              //   operator: item.operator,
              //   metricType: item.attrName,
              //   value: item.value,
              // });
      //       })
      // })
  //   }
  // })
  },[outsideRef])

  return (
    <div className="box-wrap-common">
      <div>
        {item.children.map((subItem: any, index: number) => {
          return (
            <div key={subItem.alias}>
              <Form layout="inline" style={{ marginBottom: 10 }} ref={(e)=>outsideRef[index] = e}>
                {/* 第二级 - 选择数据表 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end'
                  }}
                >
                  <Form.Item name="archiveName">
                    <Select
                      placeholder="请选择数据表"
                      optionFilterProp="children"
                      filterOption={true}
                      showSearch
                      onChange={(val: any, code: any) => {
                        item.relateFiled = code?.partitionKey;
                        item.backFiled = [code?.partitionKey];
                        checkArchiveNameRemoveSubItem(
                          item.alias,
                          subItem.alias,
                          val
                        );
                        onTableName(val);
                      }}
                    >
                      {tableNameTest?.map((code: any, index: number) => (
                        <Option
                          key={index}
                          value={code.value}
                          partitionKey={code?.partitionKey}
                        >
                          {code.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
                {/* 第二级 - 业务明细表独有添加时间组件 */}
                {subItem.showTimeSelector && (
                  <Form.Item name="dateTime">
                    <RangePicker
                      presets={rangePresets}
                      onChange={(e: any) => {
                        if (e) {
                          subItem.timeValue = {
                            startTime: dayjs(e[0]).format(
                              'YYYY-MM-DD HH:mm:ss'
                            ),
                            endTime: dayjs(e[1]).format('YYYY-MM-DD HH:mm:ss')
                          };
                        } else {
                          subItem.timeValue = { startTime: '', endTime: '' };
                        }
                      }}
                    />
                  </Form.Item>
                )}
                {/* 新增详细条件 && 删除条件 */}
                <Form.Item>
                  <span
                    onClick={() => {
                      addSubSubItem(item.alias, subItem.alias);
                    }}
                    className="condition-addition"
                  >
                    <PlusOutlined style={{ marginRight: 5 }} />
                    条件添加
                  </span>
                </Form.Item>
                <Form.Item>
                  <span
                    onClick={() => removeSubItem(item.alias, subItem.alias)}
                    className="minus-circle-outlined"
                  >
                    <MinusCircleOutlined />
                  </span>
                </Form.Item>
              </Form>
              <div className="box-wrap-common">
                {subItem?.metric?.length > 1 ? (
                  <span
                    style={{
                      color: 'rgb(107, 107, 107)',
                      fontSize: '12px',
                      marginRight: 16
                    }}
                  >
                    并且满足
                  </span>
                ) : (
                  ''
                )}
                {subItem?.metric?.length > 1 ? (
                  <Line value={subItem} key={item.alias} name="metricType" />
                ) : (
                  ''
                )}
                <div>
                  {subItem?.metric?.map((subSubItem: any, subSubIndex: any) => {
                    return (
                      <Form
                        layout="inline"
                        key={subSubItem.alias}
                        ref={(e)=>threeRef[index+'_'+ subSubIndex] = e}
                        initialValues={{
                          operator: null
                        }}
                        style={{
                          marginBottom: 10,
                          marginLeft: subItem?.metric.length > 1 ? 0 : 60
                        }}
                      >
                        {/* 第三级 - 添加条件 - 操作字段 */}
                        <Form.Item name="metricType">
                          <Select
                            placeholder="操作字段"
                            style={{ width: 80 }}
                            onChange={(_, code: any) => {
                              subSubItem.componentType = code?.type;
                              subSubItem.attrName = code?.value;
                              subItem.tableName = code?.querySql;
                              subItem.relateFiled = code?.partitionKey;
                              subItem.backFiled = [code?.partitionKey];
                              subSubItem.component = null;
                              setSubSubItemState(Object.assign([], item));
                              addDateLinkageChildren(
                                item.alias,
                                subItem.alias,
                                subSubItem.alias,
                                code?.type
                              );
                              threeRef.current.setFieldsValue({
                                operator: null
                              });
                            }}
                          >
                            {fieldNameCheck?.map((code: any, key: any) => (
                              <Option
                                key={key}
                                value={code?.value}
                                type={code?.fieldType}
                                querySql={code?.querySql}
                                partitionKey={code?.partitionKey}
                              >
                                {code?.label}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        {/* 第三级 - 添加条件 - 选择操作符 */}
                        <Form.Item name="operator">
                          <Select
                            onChange={e => {
                              handleSelectChange(
                                subSubItem.componentType, //操作字段的类型
                                e, //区间的范围
                                subSubItem // 当前操作字段
                              );
                              subSubItem.operator = e;
                            }}
                            placeholder="操作符"
                            style={{ width: 120 }}
                          >
                            {subSubItem.componentType &&
                              operatorType[subSubItem.componentType]?.map(
                                (code: any, key: any) => (
                                  <Option key={key} value={code}>
                                    {code}
                                  </Option>
                                )
                              )}
                          </Select>
                        </Form.Item>
                        {/* 第三级 - 添加条件 - 具体值 */}
                        <Form.Item name="value">
                          {subSubItemState &&
                            subSubItemState.children &&
                            subSubItemState.children[index] &&
                            subSubItemState.children[index].metric &&
                            subSubItemState.children[index].metric[
                              subSubIndex
                            ] &&
                            subSubItemState.children[index].metric[subSubIndex]
                              .component}
                        </Form.Item>
                        <Form.Item>
                          <span
                            onClick={() =>
                              removeSubSubItem(
                                item.alias,
                                subItem.alias,
                                subSubItem.alias
                              )
                            }
                            className="minus-circle-outlined"
                          >
                            <MinusCircleOutlined />
                          </span>
                        </Form.Item>
                      </Form>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div style={{ marginBottom: '10px' }}>
          {item.children.length > 0 && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => addSubItem(item.alias, false)}
            >
              主体属性表
            </Button>
          )}
          {item.children.length > 0 && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => addSubItem(item.alias, true)}
              style={{ marginLeft: 10 }}
            >
              业务明细表
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default ThreeLevel;