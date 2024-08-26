import { Form, Input, Button } from 'antd';
import { Trash2 } from 'lucide-react';

function Skill() {
  return (
    <div>
      <Form.List name='skills'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className='flex gap-5 items-center mb-5'>
                <Button size='small' onClick={() => add()}>
                  Add skill
                </Button>
              </div>
              <div className='flex flex-col gap-5  '>
                {fields.map((field, index) => (
                  <div className='grid grid-cols-4 gap-5 items-end' key={index}>
                    <Form.Item
                      label='Technology'
                      name={[field.name, 'technology']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Rating'
                      name={[field.name, 'rating']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      className='w-max'
                      onClick={() => remove(field.name)}
                    >
                      <Trash2 size={16} />
                    </Button>
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
export default Skill;
