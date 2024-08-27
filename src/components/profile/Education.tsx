import { useProgressContext } from '@/context/ProgressContext';
import { Form, Input, Button, message } from 'antd';
import { Trash2 } from 'lucide-react';

function Education() {
  const { setProgressNum } = useProgressContext();
  return (
    <div>
      <Form.List name='education'>
        {(fields, { add, remove }) => {
          return (
            <div>
              <div className='flex gap-5 items-center mb-5'>
                <Button
                  size='small'
                  onClick={() => {
                    add();
                    setProgressNum(50);
                  }}
                >
                  Add education
                </Button>
              </div>
              <div className='flex flex-col gap-5  '>
                {fields.map((field, index) => (
                  <div className='grid grid-cols-4 gap-5 items-end' key={index}>
                    <Form.Item
                      label='Qualification'
                      name={[field.name, 'qualification']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label='Year of Passing'
                      name={[field.name, 'yearOfPassing']}
                      required
                    >
                      <Input />
                    </Form.Item>
                    <Button
                      className='w-max'
                      onClick={() => {
                        remove(field.name);
                        setProgressNum(25);
                      }}
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
export default Education;
