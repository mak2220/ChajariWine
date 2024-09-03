
import Image from 'next/image';
import spinner from '../public/wineLogo.png';

const LoadingSpinner = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Image src={spinner} alt="Loading..." width={50} height={50} />
    </div>
  );
};

export default LoadingSpinner;
