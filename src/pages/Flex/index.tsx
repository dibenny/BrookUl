import { Button, Form, Input, Space, Tag } from "antd";

const Line = ({ show = false, text = "且" }) => {
  return (
    <div style={{ position: "relative", marginRight: 20, width: 1, background: "#A0D911", display: show? "" : "none" }}>
      <Tag
        color="success"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {text}
      </Tag>
    </div>
  );
};

const MyFormComponent = () => {
  const [form] = Form.useForm();
  const values = Form.useWatch("items", form);

  console.log("values", form.getFieldsValue());

  return (
    <Form form={form}>
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <Space direction="vertical">
            <div style={{ display: "flex", position: "relative" }}>
              <Line show={values?.length > 1} />
              <Space direction="vertical" size={[24, 24]}>
                {fields.map((field, i) => {
                  const hidden = values?.[i]?.list?.length > 0;
                  return (
                    <Space key={i}>
                      <Form.Item hidden={hidden} name={[field.name, "name"]} initialValue="VIP等级" style={{ marginBottom: 0 }}>
                        <Input />
                      </Form.Item>
                      <Form.Item hidden={hidden} name={[field.name, "rule"]} initialValue="等于" style={{ marginBottom: 0 }}>
                        <Input />
                      </Form.Item>
                      <Form.Item hidden={hidden} name={[field.name, "remark"]} initialValue="" style={{ marginBottom: 0 }}>
                        <Input />
                      </Form.Item>
                      <Form.List name={[field.name, "list"]} style={{ marginBottom: 0 }}>
                        {(subFields, subOpt) => (
                          <div style={{ backgroundColor: "pink" }}>
                            <div style={{ display: "flex", position: "relative" }}>
                              <Line show={values?.[i]?.list?.length > 0} />
                              <Space>
                                <Space direction="vertical" size={12}>
                                  {subFields.map((subField, i) => (
                                    <Space key={i}>
                                      <Form.Item noStyle name={[subField.name, "first"]} style={{ marginBottom: 0 }} initialValue="VIP等级" required>
                                        <Input />
                                      </Form.Item>
                                      <Form.List name={[field.name, "list"]} style={{ marginBottom: 0 }}>
                        {(subSubFields, subSbuOpt) => (
                          <div style={{ backgroundColor: "pink" }}>
                            <div style={{ display: "flex", position: "relative" }}>
                              <Line show={values?.[i]?.list?.length > 0} />
                              <Space>
                                <Space direction="vertical" size={12}>
                                  {subSubFields.map((subSubField, i) => (
                                    <Space key={i}>
                                      <Form.Item noStyle name={[subSubField.name, "first"]} style={{ marginBottom: 0 }} initialValue="VIP等级" required>
                                        <Input />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subSubField.name, "second"]} style={{ marginBottom: 0 }} initialValue="等于" required>
                                        <Input />
                                      </Form.Item>
                                      <Form.Item noStyle name={[subSubField.name, "third"]} style={{ marginBottom: 0 }} required>
                                        <Input />
                                      </Form.Item>
                                    </Space>
                                  ))}
                                </Space>
                              </Space>
                            </div>
                            <Space direction="vertical" size={12}>
                              <Button type="dashed" onClick={() => subSbuOpt.add()} block>
                                新增表单
                              </Button>
                            </Space>
                          </div>
                        )}
                      </Form.List>
                                    </Space>
                                  ))}
                                </Space>
                              </Space>
                            </div>
                            <Space direction="vertical" size={12}>
                              <Button type="dashed" onClick={() => subOpt.add()} block>
                                新增表单
                              </Button>
                            </Space>
                          </div>
                        )}
                      </Form.List>
                    </Space>
                  );
                })}
              </Space>
            </div>
            <Button type="primary" onClick={add} block style={{ marginTop: 10 }}>
              新增单元
            </Button>
          </Space>
        )}
      </Form.List>
    </Form>
  );
};

export default MyFormComponent;