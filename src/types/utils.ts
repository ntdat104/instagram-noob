import { DOMAttributes } from 'react';

export interface IconProps extends DOMAttributes<SVGSVGElement> {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

export type Callback = () => void;

export type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any],
> = (...args: [...Parameters<TFunction>, ...TParameters]) => ReturnType<TFunction>;

export type FollowAction = 'follow' | 'unfollow';

// export type AddParameters2<Fn, NewType> = Fn extends (...arg: infer R) => any
//   ? (...args: [...R, NewType]) => ReturnType<Fn>
//   : never;
