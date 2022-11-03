import { generateAction } from './shared';

const sharedActions = [
  {
    title: 'Go to post',
    actionId: 'goToPost',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Share to',
    actionId: 'shareTo',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Copy link',
    actionId: 'copyLink',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Embed',
    actionId: 'embed',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Cancel',
    actionId: 'cancel',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
] as const;

const noobActions = [
  {
    title: 'Report',
    actionId: 'report',
    action: () => {},
    hasConfirm: true,
    maintain: false,
  },
  {
    title: 'Follow',
    actionId: 'follow',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Unfollow',
    actionId: 'unfollow',
    action: () => {},
    hasConfirm: true,
    maintain: false,
  },
] as const;

const privateActions = [
  {
    title: 'Delete',
    actionId: 'delete',
    action: () => {},
    hasConfirm: true,
    maintain: false,
  },
  {
    title: 'Edit',
    actionId: 'edit',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Hide like count',
    actionId: 'hideLikeCount',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
  {
    title: 'Turn off commenting',
    actionId: 'turnOffCommenting',
    action: () => {},
    hasConfirm: false,
    maintain: false,
  },
] as const;

export default class PostActions {
  allActions = [...noobActions, ...sharedActions, ...privateActions];
  publicActions = [...noobActions, ...sharedActions];
  meActions = [...privateActions, ...sharedActions];

  addPostAction = generateAction(this.allActions);
}
