import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import clsx from 'clsx';

import { GOOGLE_CLIENT_ID, ROUTES } from '~/constants';
import { useLoginGoogleMutation } from '~/types/generated';
import { toast } from '~/store/toast';
import { useStoreDispatch } from '~/redux/store';
import { userActions } from '~/redux/slices/userSlice';
import { useUserSelector } from '~/redux/selectors';

interface ButtonGoogleProps {
  disabled?: boolean;
  className?: string;
}

// TODO: Fix auto request when in incognito mode
const ButtonGoogle = ({ disabled, className }: ButtonGoogleProps) => {
  const { isLoggedIn } = useUserSelector();

  const [loginGoogle] = useLoginGoogleMutation();
  const router = useRouter();
  const dispatch = useStoreDispatch();

  const handleGoogleResponse = async (
    ggResponse: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if (ggResponse.code || disabled || isLoggedIn) return;

    const response = await loginGoogle({
      variables: {
        clientId: GOOGLE_CLIENT_ID as string,
        tokenId: (ggResponse as GoogleLoginResponse).tokenId,
      },
    });

    if (response.data?.loginGoogle.success) {
      dispatch(userActions.setLoggedIn(true));
      toast({ messageType: 'loginSuccess', status: 'success' });
      router.push(ROUTES.HOME);
    }
  };

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID as string}
      buttonText='Login'
      onSuccess={handleGoogleResponse}
      onFailure={handleGoogleResponse}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          className={clsx(
            'btn text-sm w-full gap-x-2 h-auth-btn-h',
            'text-white bg-base-red',
            disabled && 'btn--disabled',
            className,
          )}
        >
          <FontAwesomeIcon icon={faGoogle} className='text-white' size='1x' />
          <span>Log in with Google</span>
        </button>
      )}
    />
  );
};

export default ButtonGoogle;
1;
