import { useEffect, useState } from 'react';
import NextLink from 'next/link';

import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBilibili } from '@fortawesome/free-brands-svg-icons';
import clsx from 'clsx';

import { ROUTES } from '~/constants';
import { ForgotPasswordMutationVariables, useForgotPasswordMutation } from '~/types/generated';
import { withRoute } from '~/hocs';
import { toast } from '~/store/toast';
import toErrorMap from '~/helpers/toErrorMap';

import { SpinnerRing } from '~/components/Spinner';
import FormDivider from '~/components/FormDivider';
import FormField from '~/components/FormField';
import Meta from '~/layouts/Meta';

const ForgotPassword = () => {
  const [linkReset, setLinkReset] = useState<string>('');

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordMutationVariables>();

  const [forgotPassword, { loading: forgotPasswordLoading }] = useForgotPasswordMutation();

  const isTyped = watch('usernameOrEmail');

  const handleResetSubmit = async ({ usernameOrEmail }: ForgotPasswordMutationVariables) => {
    if (!isTyped || forgotPasswordLoading) return;

    const response = await forgotPassword({
      variables: {
        usernameOrEmail,
      },
    });

    const data = response.data?.forgotPassword;

    if (data?.errors) {
      const { field, message } = toErrorMap(data.errors);

      setError(field, { message });
    } else if (data?.linkReset) {
      toast({ messageType: 'getLinkResetSuccess', status: 'success' });
      setLinkReset(data.linkReset);
    }
  };

  useEffect(() => setFocus('usernameOrEmail'), [setFocus]);

  let body = null;

  if (!linkReset) {
    body = (
      <form className='flex flex-col gap-y-3 mt-3' onSubmit={handleSubmit(handleResetSubmit)}>
        <FormField
          register={register('usernameOrEmail')}
          placeholder='Email or Username'
          errors={errors}
        />

        <button
          type='submit'
          className={clsx(
            'btn text-sm w-full gap-x-2 h-auth-btn-h mt-2',
            'text-white bg-primary',
            !isTyped && !forgotPasswordLoading && 'btn--disabled',
            forgotPasswordLoading && 'btn--pending',
          )}
        >
          {forgotPasswordLoading ? <SpinnerRing className='text-white' /> : 'Send Link Reset'}
        </button>
      </form>
    );
  } else {
    body = (
      <button className={clsx('btn text-sm w-full mt-2', 'text-white bg-primary')}>
        <a className='block h-full w-full py-2' target='_blank' rel='noreferrer' href={linkReset}>
          Get Link
        </a>
      </button>
    );
  }

  return (
    <Meta title='Forgot Password'>
      <div className={clsx('w-form-w mx-auto py-9')}>
        <div className='wrapper-border px-10 py-12'>
          <FontAwesomeIcon
            icon={faBilibili}
            size='5x'
            className={clsx('w-full', 'text-base-black')}
          />
          <h2 className={clsx('text-base text-center font-medium mt-4')}>
            {linkReset ? 'Send link success!' : 'Trouble Logging In?'}
          </h2>
          <p className={clsx('text-sm-1 mt-2 text-center', 'text-base-gray')}>
            {linkReset
              ? 'Click here to get link reset'
              : "Enter your email or username and we'll send you a link to get back into your account."}
          </p>

          {body}

          <FormDivider className='mt-7' />
          <NextLink href={ROUTES.REGISTER}>
            <a className={clsx('block w-full text-sm-1 font-medium text-center mt-7')}>
              Create New Account
            </a>
          </NextLink>
        </div>
        <NextLink href={ROUTES.LOGIN}>
          <a
            className={clsx(
              'block text-center w-full font-medium py-3 text-sm border-1 border-line border-t-0',
              'bg-gray-50',
              'active:opacity-70',
            )}
          >
            Back To Login
          </a>
        </NextLink>
      </div>
    </Meta>
  );
};

export default ForgotPassword;

export const getServerSideProps = withRoute({ isProtected: false })();
