import React, { useState, useRef } from 'react';
import DateChooser from './dateChooser';

import './index.less';
const Index = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [chooserTimeCache, setChooserTimeCache] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState({
    label: '',
    startDate: '',
    endDate: ''
  });
  const dateTimeRef = useRef({});

  const toggleCalendar = () => {
    setChooserTimeCache(selectedDate?.label);
    setShowCalendar(!showCalendar);
  };

  const getQuickSelectTime = (label: any, startDate: any, endDate: any) => {
    dateTimeRef.current = {
      startDate,
      endDate
    };
    setSelectedDate({ label, startDate, endDate });
    setShowCalendar(false);
  };

  const timeValueShow = () => {
    const { label, startDate, endDate } = selectedDate;
    const _startDate = startDate.split(' ')?.[0];
    const _endDate = endDate.split(' ')?.[0];
    console.log('label', label, '<<<<<<label', typeof label, label !== '');
    if (label !== '') {
      return label + ' | ' + _startDate + ' 至 ' + _endDate;
    } else if (_startDate && _endDate) {
      return _startDate + ' 至 ' + _endDate;
    } else {
      return '';
    }
  };

  return (
    <div className="date-picker">
      <input
        type="text"
        value={timeValueShow()}
        onClick={toggleCalendar}
        placeholder="请选择时间"
        readOnly
        style={{
          borderRadius: 3,
          border: '1px solid #d9d9d9'
        }}
      />
      {showCalendar && (
        <DateChooser
          getQuickSelectTime={getQuickSelectTime}
          chooserTimeCache={chooserTimeCache}
        />
      )}
    </div>
  );
};

export default Index;