import { Form, Input, Button } from 'antd';
import { Trash2 } from 'lucide-react';

function Experience() {
  return (
    <div>
      <Form.List name='experience'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className='flex gap-5 items-center mb-5'>
                <Button size='small' onClick={() => add()}>
                  Add experience
                </Button>
              </div>
              <div className='flex flex-col gap-5  '>
                {fields.map((field, index) => (
                  <div
                    className='grid grid-cols-4 gap-5 items-end p-5 border border-solid border-primary'
                    key={index}
                  >
                    <Form.Item
                      label='Company'
                      name={[field.name, 'company']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Role'
                      name={[field.name, 'role']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Start Date'
                      name={[field.name, 'startDate']}
                      required
                    >
                      <Input type='date' />
                    </Form.Item>
                    <Form.Item
                      label='End Date'
                      name={[field.name, 'endDate']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <div className='col-span-4 flex gap-5 items-end'>
                      <Form.Item
                        label='Roles and Responsibilities'
                        name={[field.name, 'rolesAndResponsibilities']}
                        className='flex-1'
                        required
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <Button
                        className='w-max'
                        onClick={() => remove(field.name)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Form.List>
    </div>
  );
}
export default Experience;
