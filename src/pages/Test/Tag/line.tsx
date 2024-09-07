import React, { useRef, useState } from 'react';
// import { Form } from 'antd';
import './styles.less';

const Line = ({ style, refCallBack ,value}: any) => {
  const [andOr, setAndOr] = useState('And');
  const lineRef = useRef(null);

  if(value){
    value.metricType = andOr
  }
  if (refCallBack) {
    refCallBack(lineRef);
  }
  const setData =()=>{
    if(value){
      value.metricType = andOr === 'And' ? 'Or' : 'And'
    }
  }

  return (
    <div className="connect-box" style={style}>
        <div className="connect-box-line"></div>
        <span
          ref={lineRef}
          className="connect-box-text"
          onClick={() =>{
            setAndOr(code => (code === 'And' ? 'Or' : 'And'))
            setData()
          }
          }
        >
          {andOr === 'And' ? '且' : '或'}
        </span>
        <div className="connect-box-line"></div>
      </div>
  );
};

export default Line;