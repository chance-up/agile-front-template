import { GateWayResponse } from '@/types/GateWayResponse';
import { DummyServiceResponse } from '@/types/ServiceType';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';

@Module({ name: 'ServiceModule' })
export default class ServiceModule extends VuexModule {}
