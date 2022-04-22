import { ApiDetailResponse, apiMockData } from '@/types/ApiType';
import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '../ApiResponse';
import { addMock } from '../AxiosClient';

export const getApiDetail = async (apiId: number) => {
  addMock('/api/detail', JSON.stringify(apiMockData));
  const response = await ApiResponse.getInstance().get<GateWayResponse<ApiDetailResponse>>('/api/detail', { apiId });
  console.log(response);
  return response;
};
