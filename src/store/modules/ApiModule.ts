import { GateWayResponse, Pagination } from '@/types/GateWayResponse';
import {
  ApiSearchQuery,
  apiMockList,
  ApiDetailResponse,
  apiMockData,
  apiMockData2,
  dummyDeleteResData,
  dummyApiIdValidCheck,
  ResponseApiIdValidCheck,
  ApiUpdateRequestBody,
  ApiCreateRequestBody,
} from '@/types/ApiType';
import { addMock } from '@/axios/AxiosIntercept';
import { Module, Mutation, Action } from 'vuex-module-decorators';
import { AxiosClient } from '@/axios/AxiosClient';
import { GateWayError } from '@/error/GateWayError';
import ErrorCode from '@/error/ErrorCodes';
import GateWayModule from '../GateWayModule';
import { dummyListData } from '@/types/SystemType';

function handleCommonError(error: GateWayError | any) {
  try {
    if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
      console.log('NETWORK_ERROR');
    } else {
      console.log('서버통신에 실패하였습니다.');
    }
  } catch (e) {
    console.log('서버통신에 실패하였습니다.');
  }
}
@Module({ name: 'ApiModule' })
export default class ApiModule extends GateWayModule {
  //api 리스트 요청

  public apiList: ApiDetailResponse[] = [];
  public apiDetail: ApiDetailResponse | null = null;
  public apiPagination: Pagination | null = null;

  // 초기화
  @Action
  apiReset() {
    // release시 에러 발생 (동작은 정상동작)
    this.release();
    this.context.commit('setApiPagination', null);
    this.context.commit('setApiList', []);
    this.context.commit('setApiDetail', null);
  }

  // api 리스트 요청
  @Mutation
  setApiList(list: ApiDetailResponse[]): void {
    console.log('set API list', list);
    this.apiList = list;
  }
  @Action
  async getApiList(searchQuery?: ApiSearchQuery) {
    try {
      console.log('searchQuery: ', searchQuery);
      // 목 검색작업 시작(api연결후 삭제필요)
      // ============================
      const mockList: GateWayResponse<ApiDetailResponse[]> = JSON.parse(JSON.stringify(apiMockList));
      mockList.data.value = mockList.data.value.filter((item: ApiDetailResponse) => {
        if (searchQuery) {
          if (searchQuery.id) {
            return item.id.indexOf(searchQuery.id) > -1;
          } else if (searchQuery.uri) {
            return item.uriIn.indexOf(searchQuery.uri) > -1;
          } else {
            return mockList.data.value;
          }
        }
      });
      // ============================
      (mockList.data.pagination as Pagination).total_elements = mockList.data.value.length;
      (mockList.data.pagination as Pagination).total_pages = parseInt(mockList.data.value.length / 10 + 1 + '');
      addMock('/api/list', JSON.stringify(mockList));
      const response = await AxiosClient.getInstance().get<GateWayResponse<ApiDetailResponse[]>>(
        '/api/list',
        searchQuery
      );
      // 아래 map 조건문은 meth 속성 타입이 string[]로 변경될 시 삭제해야 함
      response.data.value.map((item: ApiDetailResponse) => {
        if (typeof item.meth == 'string') item.meth = JSON.parse(item.meth);
      });

      this.context.commit('setApiList', response.data.value);
      this.context.commit('setApiPagination', response.data.pagination);
    } catch (error: GateWayError | any) {
      handleCommonError(error);

      // 디테일 에러 처리
    }
  }

  //api 상세 요청
  @Mutation
  setApiDetail(api: ApiDetailResponse | null) {
    console.log('set API detail', api);
    this.apiDetail = api;
  }
  @Action
  async getApiDetail(id: string) {
    try {
      // param 체크
      const dummyDetail = JSON.parse(JSON.stringify(apiMockData));
      dummyDetail.data.value = apiMockList.data.value.filter((item: ApiDetailResponse) => item.id === id)[0];
      addMock('/mngt/v1/getApiByIdAndSysId', JSON.stringify(dummyDetail));
      const response = await AxiosClient.getInstance().get<GateWayResponse<ApiDetailResponse>>(
        '/mngt/v1/getApiByIdAndSysId',
        { id }
      );
      // 아래 조건문은 meth 속성 타입이 string[]로 변경될 시 삭제해야 함
      if (typeof response.data.value.meth == 'string') response.data.value.meth = JSON.parse(response.data.value.meth);
      console.log('get API detail', response.data.value);
      this.context.commit('setApiDetail', response.data.value);
    } catch (error: GateWayError | any) {
      handleCommonError(error);
    }
  }

  // API 생성
  @Action
  async postApi(api: ApiCreateRequestBody) {
    try {
      addMock(`/mngt/v1/api`, JSON.stringify(apiMockData));
      const response = await AxiosClient.getInstance().post<GateWayResponse<ApiDetailResponse>>('/mngt/v1/api', api);
      console.log('postApi response: ', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // Api 수정
  @Action
  async putApi(api: ApiUpdateRequestBody) {
    try {
      addMock(`/mngt/v1/api`, JSON.stringify(apiMockData));
      const response = await AxiosClient.getInstance().put<GateWayResponse<ApiDetailResponse>>('/mngt/v1/api', api);
      console.log('putApi response: ', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // Api 삭제
  @Action
  async deleteApi(id: string) {
    try {
      addMock(`/api/deleteApi/${id}`, JSON.stringify(dummyDeleteResData));
      const response = await AxiosClient.getInstance().get<GateWayResponse<ApiDetailResponse[]>>(
        `/api/deleteApi/${id}`
      );
      console.log('api delete response: ', response);
    } catch (error: GateWayError | any) {
      if (error.getErrorCode() == ErrorCode.NETWORK_ERROR) {
        console.log('NetWork not connection');
      } else {
        console.log('서버통신에 실패하였습니다.');
      }
    }
  }

  // 페이지네이션
  @Mutation
  setApiPagination(pagination: Pagination | null): void {
    console.log('set API pagination', pagination);
    this.apiPagination = pagination;
  }
}

// 중복 체크
export const apiValidationCheck = async (id: string) => {
  try {
    addMock('/mngt/v1/apiCheckApiByIdAndSysId', JSON.stringify(dummyApiIdValidCheck));

    const response = await AxiosClient.getInstance().get<GateWayResponse<ResponseApiIdValidCheck>>(
      '/mngt/v1/apiCheckApiByIdAndSysId',
      { id }
    );
    console.log('apiValidationCheck => ' + response);
    return response.data.value.isPkDuplicated as boolean;
  } catch (error: GateWayError | any) {
    handleCommonError(error);
    return false;
  }
};
