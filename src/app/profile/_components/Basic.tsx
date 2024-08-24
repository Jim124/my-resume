import { Form, Input } from 'antd';

function Basic() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      <Form.Item name='name' label='Name' required>
        <Input />
      </Form.Item>
      <Form.Item name='email' label='Email' required>
        <Input />
      </Form.Item>
      <Form.Item name='phone' label='Phone' required>
        <Input />
      </Form.Item>
      <Form.Item name='portfolio' label='Portfolio' required>
        <Input />
      </Form.Item>
      <div className='col-span-4'>
        <Form.Item name='carrierObjective' label='Carrier Objective' required>
          <Input.TextArea rows={4} />
        </Form.Item>
      </div>
    </div>
  );
}
export default Basic;
