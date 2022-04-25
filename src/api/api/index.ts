import { ApiDetailResponse, apiMockData } from '@/types/ApiType';
import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '../ApiResponse';
import { addMock } from '../AxiosClient';

export const getApiDetail = async (apiId: number) => {
  addMock('/api/detail', JSON.stringify(apiMockData));
  const response = await ApiResponse.getInstance().get<ApiDetailResponse>('/api/detail', { apiId });
  console.log(response);
  if (typeof response.meth == 'string') response.meth = JSON.parse(response.meth);
  return response;
};
