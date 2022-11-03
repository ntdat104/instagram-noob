import { ClassType } from 'type-graphql';

const extender = (...classes: any[]): ClassType => {
  return classes.reduce(
    (accumulatorClass, currentClass) => currentClass(accumulatorClass),
    class Accumulator {},
  );
};

export default extender;
