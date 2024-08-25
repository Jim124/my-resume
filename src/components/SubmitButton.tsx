import { Button } from 'antd';
import { Loader } from 'lucide-react';

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button type='primary' htmlType='submit' disabled={loading}>
      {loading ? <Loader className='mr-2  h-4 w-4 animate-spin ' /> : 'Save'}
    </Button>
  );
}
export default SubmitButton;
