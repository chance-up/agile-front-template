import { DummyApiResponse, dummyData } from '@/types/ApiType';
import { GateWayResponse } from '@/types/GateWayResponse';
import { ApiResponse } from '../ApiResponse';
import { addMock } from '../AxiosClient';

export const getApiDetail = async (apiId: number) => {
  addMock('/api/detail', JSON.stringify(dummyData));
  const response = await ApiResponse.getInstance().get<GateWayResponse<DummyApiResponse>>('/api/detail', { apiId });
  console.log(response);
  return response;
};
