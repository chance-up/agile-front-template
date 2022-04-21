import { GateWayResponse } from '@/types/GateWayResponse';
import { DummyServiceResponse } from '@/types/ServiceType';
import { ApiResponse } from '@/api/ApiResponse';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { ParameterError } from '@/error/Errors';

@Module({ name: 'SystemModule' })
export default class SystemModule extends VuexModule {}
