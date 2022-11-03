import { faCheck, faExclamation, faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

// types
import { Toast } from '~/types/toast';

type GetToastTheme = (toastType: Toast['status']) => {
  title: string;
  background: string;
  iconColor: string;
  icon: IconDefinition;
};

export const getToastTheme: GetToastTheme = (toastType) => {
  switch (toastType) {
    case 'success':
      return {
        title: 'Success',
        background: 'bg-toast-success',
        iconColor: 'text-toast-success',
        icon: faCheck,
      };
    case 'warning':
      return {
        title: 'Warning',
        background: 'bg-toast-warning',
        iconColor: 'text-toast-warning',
        icon: faExclamation,
      };
    case 'error':
      return {
        title: 'Error',
        background: 'bg-toast-error',
        iconColor: 'text-toast-error',
        icon: faXmark,
      };
    default:
      throw new Error('Invalid toast type');
  }
};

export const toastMessages = {
  loginSuccess: 'Well comeback!',
  registerSuccess: 'Wellcome new friend!',
  sharePostSuccess: 'The post has been shared successfully!',
  deletePostSuccess: 'The post has been deleted successfully!',
  updatePostSuccess: 'The post has been updated successfully!',
  followUserSuccess: 'Follow user successfully!',
  unfollowUserSuccess: 'Unfollow user successfully!',
  fieldMissing: 'Field is missing!',
  invalidImage: 'Invalid image, please choose another one',
  changePasswordSuccess: 'Change password successfully',
  getLinkResetSuccess: 'Get link reset successful',
  serverError: 'Server got an error, please try again later',
} as const;
