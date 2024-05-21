import { type ReactElement } from 'react';
// import SignIn from '@/features/signIn';
// import { useLoggedInStore } from '@/features/signIn/store/useLoggedInStore';

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  // const { isLoggedIn } = useLoggedInStore();
  return children;
  // return isLoggedIn ? children : <SignIn />;
};

export default PrivateRoute;
