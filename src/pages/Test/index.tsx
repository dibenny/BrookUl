import React, { memo, useRef, useState } from 'react';
import { Button } from 'antd';
import TagForm from './Tag';
import './Tag/styles.less';

const index = memo((props: any) => {
  const tagRefs = useRef<any>(null);
  const [items, setItems] = useState<any>([]);

  const onConfirm = () => {
    const allTagFormData = tagRefs?.current.getTagFormData();
    console.log('allTagFormData', allTagFormData?.tagRule);
  };

  return (
    <>
      <div>
        <div className="mt-10">
          <div className="common-card mt-10">
            <TagForm
              setItems={setItems}
              items={items}
              ref={tagRefs}
              dispatch={props.dispatch}
            />
            <Button onClick={onConfirm} type="primary">
              提交
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

export default index;