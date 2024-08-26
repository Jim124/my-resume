import { Button } from 'antd';
import { Loader } from 'lucide-react';

function SubmitButton({
  loading,
  text = 'Save',
}: {
  loading: boolean;
  text?: string;
}) {
  return (
    <Button type='primary' htmlType='submit' disabled={loading}>
      {loading ? <Loader className='h-4 w-4 animate-spin ' /> : text}
    </Button>
  );
}
export default SubmitButton;
