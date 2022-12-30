import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <h2 className="">Ops! Not Found</h2>
      <Link to="/">GO HOME</Link>
    </>
  );
};

export default NotFound;
