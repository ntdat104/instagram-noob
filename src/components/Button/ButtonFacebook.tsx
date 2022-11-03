import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import clsx from 'clsx';

import { FACEBOOK_CLIENT_ID, ROUTES } from '~/constants';
import { useLoginFacebookMutation } from '~/types/generated';
import { toast } from '~/store/toast';
import { useStoreDispatch } from '~/redux/store';
import { userActions } from '~/redux/slices/userSlice';
import { useUserSelector } from '~/redux/selectors';

interface ButtonFacebookProps {
  disabled?: boolean;
  className?: string;
}

const ButtonFacebook = ({ disabled, className }: ButtonFacebookProps) => {
  const { isLoggedIn } = useUserSelector();

  const [loginFacebook] = useLoginFacebookMutation();
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const handleFacebookResponse = async (fbResponse: ReactFacebookLoginInfo) => {
    if (disabled || isLoggedIn) return;

    const response = await loginFacebook({
      variables: {
        accessToken: fbResponse.accessToken,
        userId: fbResponse.userID,
      },
    });

    if (!response.data?.loginFacebook.success) return;

    dispatch(userActions.setLoggedIn(true));
    toast({ messageType: 'loginSuccess', status: 'success' });

    router.push(ROUTES.HOME);
  };

  return (
    <FacebookLogin
      appId={FACEBOOK_CLIENT_ID}
      autoLoad={false}
      fields='name,email,picture'
      callback={handleFacebookResponse}
      render={(renderProps: any) => (
        <button
          onClick={renderProps.onClick}
          className={clsx(
            'btn text-sm w-full gap-x-2 h-auth-btn-h',
            'text-white bg-primary',
            disabled && 'btn--disabled',
            className,
          )}
        >
          <FontAwesomeIcon icon={faFacebookSquare} className='text-white' size='lg' />
          <span>Log in with Facebook</span>
        </button>
      )}
    />
  );
};

export default ButtonFacebook;
1;
