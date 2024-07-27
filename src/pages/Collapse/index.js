import CollapsePro from '@/components/Collapse';

export default function index() {
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{text}</p>,
      size: 'small',
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
      size: 'large',
    },
  ];
  return <CollapsePro items={items} size="large" ghost={false}></CollapsePro>;
}
