import { api } from './instances/base';
import { ApiRoutes } from './constants';

export const getFeed = async () => {
  const { data } = await api.get(ApiRoutes.FEED.GET);
  return data;
};