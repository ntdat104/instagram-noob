import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

// types
import { StoreDispatch } from '~/types/store';
import { AddParameters } from '~/types/utils';

import { GetSessionDocument, GetSessionQuery } from '~/types/generated';
import { COOKIE_NAMES, ROUTES } from '~/constants';
import { clearAllCookies, setCookie } from '~/helpers/cookie';
import { initializeApollo } from '~/lib/apolloClient';
import { wrapper } from '~/redux/store';
import { authActions } from '~/redux/slices/authSlice';

interface WrapperOptions {
  isProtected: boolean;
}

type WithPageProps = <P extends Record<string, unknown> = Record<string, unknown>>(
  options: WrapperOptions,
) => (
  callback?: AddParameters<GetServerSideProps<P>, [dispatch: StoreDispatch]>,
) => (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>;

export const withRoute: WithPageProps = (options) => (callback) =>
  wrapper.getServerSideProps(({ dispatch }) => async (ctx) => {
    const { req, res, resolvedUrl } = ctx;

    const { isProtected } = options;
    const { access_token, refresh_token, prev_route } = req.cookies;
    const isMissingToken = !access_token || !refresh_token;

    const redirectToLogin = () => ({
      redirect: {
        destination: ROUTES.LOGIN,
        permanent: false,
      },
    });

    const removeSession = () => {
      clearAllCookies(res);

      return redirectToLogin();
    };

    if (isMissingToken) {
      clearAllCookies(res);

      if (isProtected) return redirectToLogin();
    }

    // Redirect back if try to login when authenticated
    if (!isProtected && !isMissingToken)
      return {
        redirect: {
          destination: prev_route ?? ROUTES.HOME,
          permanent: false,
        },
      };

    if (isProtected) {
      const client = initializeApollo({ headers: ctx.req.headers });

      try {
        const {
          data: { getSession },
        } = await client.query<GetSessionQuery>({
          query: GetSessionDocument,
        });

        const { success, user, accessToken } = getSession;

        // Invalid token
        if (!success) return removeSession();

        if (user) dispatch(authActions.setCurrentUser(user));

        // Access token has expired then refresh
        if (success && accessToken) {
          setCookie(res, [
            { key: COOKIE_NAMES.ACCESS_TOKEN, value: accessToken },
            { key: COOKIE_NAMES.PREV_ROUTE, value: resolvedUrl ?? ROUTES.HOME },
          ]);
        } else {
          setCookie(res, { key: COOKIE_NAMES.PREV_ROUTE, value: resolvedUrl ?? ROUTES.HOME });
        }
      } catch (error) {
        return removeSession();
      }
    }

    if (!callback)
      return {
        props: {},
      } as any;

    const result = await callback(ctx, dispatch);

    if ('props' in result)
      return {
        ...result,
        props: {
          ...result.props,
        },
      };

    return {
      ...result,
      props: {},
    };
  });
