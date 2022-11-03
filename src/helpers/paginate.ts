import { AnyParamConstructor, BeAnObject, ReturnModelType } from '@typegoose/typegoose/lib/types';

type Sort = [string, 1 | -1];
type SortOperator = '$gt' | '$lt';

type GetNextCursor = (items: any[]) => Promise<{
  cursor: string | null;
  hasMore: boolean;
}>;

interface PaginateReturn {
  filterQuery: Record<string, any>;
  sort: Sort;
  getNextCursor: GetNextCursor;
}

type Paginate = <T extends AnyParamConstructor<any>>(
  Model: ReturnModelType<T, BeAnObject>,
  sort: Sort,
  cursor: string | null,
  query?: Record<string, any>,
) => PaginateReturn;

const paginate: Paginate = (Model, sort, cursor, query = {}) => {
  const sortField: string = sort[0];
  const sortOperator: SortOperator = sort[1] === 1 ? '$gt' : '$lt';

  const filterQuery = cursor ? { [sortField]: { [sortOperator]: cursor }, ...query } : query;

  const getNextCursor: GetNextCursor = async (items) => {
    if (items.length === 0) return { cursor: null, hasMore: false };

    const lastDoc = await Model.findOne(query)
      .sort({ $natural: -1 * sort[1] })
      .lean();

    const lastItem = items[items.length - 1];

    let cursor = null;

    if (sortOperator === '$gt') {
      cursor = lastItem[sortField] < lastDoc[sortField] ? lastItem[sortField] : null;
    } else {
      cursor = lastItem[sortField] > lastDoc[sortField] ? lastItem[sortField] : null;
    }

    return {
      cursor,
      hasMore: JSON.stringify(lastDoc[sortField]) !== JSON.stringify(lastItem[sortField]),
    };
  };

  return { filterQuery, sort, getNextCursor };
};

export default paginate;
