import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Tabs } from 'antd';
import Common from './common';
import DynamicTime from './dynamicTime';
import './index.less';
import dayjs from 'dayjs';
const today = dayjs();
const year = today?.year();
const month = today?.month() + 1; // 月份是从 0 开始计数的，所以要加 1
const _today = today?.date();
const _yesterday = today?.date() - 1;

const _TODAY = `${year}-${month}-${_today}`;
const _YESTERDAY = `${year}-${month}-${_yesterday}`;

const { RangePicker } = DatePicker;

function DateChooser({ getQuickSelectTime, chooserTimeCache }: any) {
  const [activeKey, setActiveKey] = useState<any>('1');
  const [leftPastNday, setLeftPastNday] = useState<string | number>(''); // 右上角左边展示
  const [rightPastNday, setRightPastNday] = useState<string | number>(''); // 右上角左边展示
  const [leftPastDateTime, setLeftPastDateTime] = useState<string | number>(''); // 右上角右边展示
  const [rightPastDateTime, setRightPastDateTime] = useState<string | number>( // 右上角右边展示
    ''
  );
  const timeDate = [
    { key: '1', label: '今天' },
    { key: '2', label: '昨天' },
    { key: '3', label: '本周' },
    { key: '4', label: '上周' },
    { key: '5', label: '本月' },
    { key: '6', label: '上月' },
    { key: '7', label: '今年' },
    { key: '8', label: '去年' },
    { key: '9', label: '过去7天' },
    { key: '10', label: '过去30天' },
    { key: '11', label: '过去90天' }
  ];

  const chooserDateClick = (_: any, label: any) => {
    const [startDate, endDate] = Common.getDateRange(label);
    getQuickSelectTime(label, startDate, endDate);
  };

  const dynamicTimeFun = (time: any) => {
    setLeftPastNday(time);
    setLeftPastDateTime(time);
  };

  const applyDateRanngeFilterFun = (date: any = 2) => {
    setRightPastNday(date);
    const _num: any = { 今日: 0, 昨日: 1, 过去: 2 };
    const getDateNDaysAgo = dayjs()
      .subtract(_num[date], 'day')
      .format('YYYY-MM-DD');
    setRightPastDateTime(getDateNDaysAgo);
  };

  // 监听左侧过去N天并记录
  const leftPastNdayFun = (numDay: number) => {
    const _leftPastDateTime = `过去${numDay}天`;
    const getDateNDaysAgo = dayjs()
      .subtract(numDay, 'day')
      .format('YYYY-MM-DD');
    setLeftPastDateTime(getDateNDaysAgo);
    setLeftPastNday(_leftPastDateTime);
  };

  // 监听右侧过去N天并记录
  const rightPastNdayFun = (numDay: number) => {
    const _rightPastDateTime = `过去${numDay}天`;
    const getDateNDaysAgo = dayjs()
      .subtract(numDay, 'day')
      .format('YYYY-MM-DD');
    setRightPastDateTime(getDateNDaysAgo);
    setRightPastNday(_rightPastDateTime);
  };

  // 保存
  const onSaveFun = () => {
    const _label =
      activeKey == 1
        ? ` ${leftPastNday ? leftPastNday + ' ' + '-' : ''}` +
          ` ${rightPastNday ? rightPastNday : '昨日'} `
        : '';
    const _startDate = leftPastDateTime ? leftPastDateTime : _YESTERDAY;
    const _endDate = rightPastDateTime ? rightPastDateTime : _TODAY;
    getQuickSelectTime(_label, _startDate, _endDate);
  };

  // 取消
  const onCancelFun = () => {
    getQuickSelectTime('今日', _TODAY, _TODAY);
  };

  // 判断开始时间是否比结束时间早
  const isStartTimeLater = (startDateStr: any, endDateStr: any) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    return startDate > endDate || false;
  };

  // 选中静态时间
  const selectStaticTimeFun = (dates: any) => {
    if (dates) {
      const startDate = dayjs(dates[0]);
      const endDate = dayjs(dates[1]);
      setLeftPastDateTime(startDate.format('YYYY-MM-DD'));
      setRightPastDateTime(endDate.format('YYYY-MM-DD'));
    }
  };

  // 监听切换的Tabs
  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div
      className="calendar"
      style={{
        boxShadow: '0 2px 8px rgba(0, 0, 0, 10%)'
      }}
    >
      <div
        className="common-flexdirection containers"
        style={{ height: '415px' }}
      >
        <div className="container-left">
          <span style={{ marginTop: '20px' }}>快速选择</span>
          <div>
            {timeDate.map(({ label, key }, index) => {
              return (
                <Button
                  key={index}
                  // @ts-ignore
                  type={chooserTimeCache === label ? 'primary' : ''}
                  className={
                    chooserTimeCache === label ? '' : 'container-left-btn'
                  }
                  style={
                    ![1, 3, 5, 7].includes(index)
                      ? {
                          marginRight: '10px',
                          width: 88
                        }
                      : { width: 88 }
                  }
                  onClick={() => chooserDateClick(key, label)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="container-right">
          <Tabs
            defaultActiveKey="1"
            indicator={{
              align: 'center'
            }}
            onChange={handleTabChange}
            items={[
              {
                label: (
                  <span>
                    动态时间
                    <span style={{ marginLeft: '5px' }}>
                      <QuestionCircleOutlined />
                    </span>
                  </span>
                ),
                key: '1',
                children: (
                  <DynamicTime
                    dynamicTimeFun={dynamicTimeFun}
                    applyDateRanngeFilterFun={applyDateRanngeFilterFun}
                    leftPastNdayFun={leftPastNdayFun}
                    rightPastNdayFun={rightPastNdayFun}
                  />
                )
              },
              {
                label: (
                  <span style={{ margin: '0px 10px' }}>
                    静态时间
                    <span style={{ marginLeft: '5px' }}>
                      <QuestionCircleOutlined />
                    </span>
                  </span>
                ),
                key: '2',
                children: (
                  <span>
                    <RangePicker onChange={selectStaticTimeFun} />
                  </span>
                )
              }
            ]}
            tabBarExtraContent={
              <span className="tab-bar-extra-content">
                {(activeKey == 1
                  ? `${leftPastNday ? leftPastNday + ' - ' : ''}` +
                    ` ${rightPastNday ? rightPastNday : ' 昨日 '} ` +
                    ' | '
                  : '') +
                  `${leftPastDateTime ? leftPastDateTime : _YESTERDAY} 至 ${rightPastDateTime ? rightPastDateTime : _TODAY}`}
              </span>
            }
          ></Tabs>
        </div>
      </div>
      <div className="bottom-button-box">
        <div>
          <Button onClick={onCancelFun}>取消</Button>
          <Button
            type="primary"
            onClick={onSaveFun}
            disabled={isStartTimeLater(leftPastDateTime, rightPastDateTime)}
          >
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DateChooser;