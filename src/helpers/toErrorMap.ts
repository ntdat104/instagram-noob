// types
import { FieldError } from '~/types/generated';

type ToErrorMap = (errors: FieldError[]) => { field: any; message: string };

const toErrorMap: ToErrorMap = (errors) => ({
  field: errors[0].field,
  message: errors[0].message,
});

export default toErrorMap;
