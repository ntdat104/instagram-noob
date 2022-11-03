interface Action<T extends { actionId: string }> {
  title: string;
  actionId: T['actionId'];
  action: () => void;
  hasConfirm: boolean;
  maintain: boolean;
}

export const generateAction = <T extends Action<T & { actionId: string }>>(allActions: T[]) => {
  const mapActionId = allActions.map((action) => action.actionId);

  return (actionId: typeof mapActionId[0], actionHandler: () => void) => {
    allActions.forEach((action) => {
      if (action.actionId === actionId) (action as any).action = actionHandler;
    });
  };
};
