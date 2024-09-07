import React, { useState } from 'react';
import { Button, Calendar, Form, InputNumber } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'; // 引入 dayjs 的中文语言包
import './index.less';
const { Item: FormItem } = Form;

const DynamicTime = (props: any) => {
  const [selectedOption, setSelectedOption] = useState('specific'); // 'specific' 或 'pastN'
  // const [form] = Form.useForm();
  const [selectedButton, setSelectedButton] = useState('昨日'); // 用于跟踪选中的按钮

  const handleButtonClick = (buttonName: any) => {
    setSelectedButton(buttonName);
    props.applyDateRanngeFilterFun(buttonName);
  };

  const handleOptionChange = (option: any) => {
    setSelectedOption(option);
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values);
    // 在这里处理提交逻辑
  };

  const onPanelChange = (value: any, mode: any) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const leftPastNday = (num: any) => {
    props.leftPastNdayFun(num);
  };

  const rightPastNday = (num: any) => {
    props.rightPastNdayFun(num);
  };
  return (
    <div className="common-flexdirection">
      <div style={{ width: '260px', textAlign: 'center' }}>
        <Button
          type={selectedOption === 'specific' ? 'primary' : 'default'}
          onClick={() => handleOptionChange('specific')}
          style={{ marginRight: '10px' }}
        >
          具体时间
        </Button>
        <Button
          type={selectedOption === 'pastN' ? 'primary' : 'default'}
          onClick={() => handleOptionChange('pastN')}
        >
          过去N天
        </Button>
        {selectedOption === 'specific' && (
          <Calendar
            // @ts-ignore
            locale={dayjs.locale('zh-cn')}
            fullscreen={false}
            onPanelChange={onPanelChange}
            onChange={(date: any) => {
              const year = date?.$d?.getFullYear();
              const month = String(date?.$d.getMonth() + 1)?.padStart(2, '0');
              const day = String(date?.$d?.getDate())?.padStart(2, '0');
              const formattedDate = `${year}-${month}-${day}`;
              props.dynamicTimeFun(formattedDate);
            }}
          />
        )}
        {selectedOption === 'pastN' && (
          <InputNumber
            placeholder="请输入过去天数"
            min={1}
            max={366}
            precision={0}
            style={{ width: '100%', marginTop: '20px' }}
            onChange={leftPastNday}
          />
        )}
      </div>
      {/* 右侧 */}
      <div
        style={{
          marginLeft: '10px',
          paddingLeft: '15px',
          height: '335px',
          borderLeft: '1px solid #e9f0f7'
        }}
      >
        <Button
          type={selectedButton === '今日' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('今日')}
          style={{ marginRight: '10px' }}
        >
          今天
        </Button>
        <Button
          type={selectedButton === '昨日' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('昨日')}
          style={{ marginRight: '10px' }}
        >
          昨天
        </Button>
        <Button
          type={selectedButton === '过去' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('过去')}
        >
          过去N天
        </Button>

        {selectedButton === '过去' && (
          <Form onFinish={handleFormSubmit} style={{ marginTop: '20px' }}>
            <FormItem
              name="pastDays"
              rules={[{ required: true, message: '请输入过去天数' }]}
            >
              <InputNumber
                placeholder="请输入过去天数"
                style={{ width: '100%' }}
                min={2}
                max={366}
                precision={0}
                onChange={rightPastNday}
              />
            </FormItem>
          </Form>
        )}
      </div>
    </div>
  );
};

export default DynamicTime;