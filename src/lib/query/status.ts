import { getApiErrorMessage } from "@/src/lib/api/errors";

interface QueryLike {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  isFetching: boolean;
}

interface MutationLike {
  isPending: boolean;
  isError: boolean;
  error: unknown;
}

/** Унифицированный статус для отображения в UI */
export function getQueryStatus(query: QueryLike) {
  return {
    isLoading: query.isPending,
    isError: query.isError,
    errorMessage: query.isError ? getApiErrorMessage(query.error) : null,
    isRefreshing: query.isFetching && !query.isPending,
  };
}

export function getMutationStatus(mutation: MutationLike) {
  return {
    isSubmitting: mutation.isPending,
    isError: mutation.isError,
    errorMessage: mutation.isError ? getApiErrorMessage(mutation.error) : null,
  };
}
