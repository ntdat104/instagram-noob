import { generateAction } from './shared';

const sharedActions = [
  {
    title: 'Report',
    actionId: 'report',
    action: () => {},
    hasConfirm: true,
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

const privateActions = [
  {
    title: 'Delete',
    actionId: 'delete',
    action: () => {},
    hasConfirm: true,
    maintain: false,
  },
] as const;

export default class CommentActions {
  allActions = [...sharedActions, ...privateActions];
  publicActions = sharedActions;
  meActions = [...privateActions, ...sharedActions];

  addCommentAction = generateAction(this.allActions);
}
