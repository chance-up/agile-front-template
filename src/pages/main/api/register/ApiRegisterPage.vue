<template lang="html">
  <ContentLayout title="API 등록" subTitle="기본정보 등록" depth="API 관리">
    <template v-slot:contents>
      <!-- 레이아웃을 제외한 실제 컨텐츠 부분을 넣어주세요 -->
      <ul>
        <li>
          <label for="" class="label point">시스템명</label>
          <div class="form-cont">
            <select class="select-box">
              <option>선택해주세요</option>
            </select>
          </div>
        </li>
        <li>
          <label for="" class="label point">API ID</label>
          <div class="form-cont">
            <input type="text" id="" class="input-box lg check-ok" placeholder="placeholder" />
          </div>
        </li>
        <li>
          <label for="" class="label point">API 명</label>
          <div class="form-cont">
            <input type="text" id="" class="input-box lg check-false" placeholder="placeholder" />
            <p class="red-txt noti">중복된 API ID 입니다.</p>
          </div>
        </li>
        <li>
          <label for="" class="label point">인터페이스 번호</label>
          <div class="form-cont">
            <input type="text" id="" class="input-box lg" placeholder="시스템명_버전_API ID" disabled />
          </div>
        </li>
        <li>
          <label for="" class="label point">Method</label>
          <div class="form-cont">
            <div class="check-group">
              <div class="check-box">
                <div class="check"><input type="checkbox" id="checkGet" /><span class="checkmark"></span></div>
                <label for="checkGet">GET</label>
              </div>

              <div class="check-box">
                <div class="check"><input type="checkbox" id="checkPost" /><span class="checkmark"></span></div>
                <label for="checkPost">POST</label>
              </div>

              <div class="check-box">
                <div class="check"><input type="checkbox" id="checkPut" /><span class="checkmark"></span></div>
                <label for="checkPut">PUT</label>
              </div>

              <div class="check-box">
                <div class="check"><input type="checkbox" id="checkDelete" /><span class="checkmark"></span></div>
                <label for="checkDelete">DELETE</label>
              </div>
            </div>
          </div>
        </li>
        <li>
          <label class="label point">URI</label>
          <div class="form-cont">
            <div class="form-group">
              <img class="img" src="@/assets/in.svg" alt="uri" />
              <input type="text" id="" class="input-box uri-input" placeholder="자동생성/변경불가" disabled />
            </div>
            <div class="form-group">
              <img class="img" src="@/assets/out.svg" alt="uri" />
              <input type="text" id="" class="input-box uri-input" placeholder="자동생성/변경불가" disabled />
              <button class="sm-btn">
                <i><img src="@/assets/edit.svg" alt="수정" /></i>
              </button>
            </div>
          </div>
        </li>
        <li>
          <label class="label point">시스템 연동 정보</label>
          <div class="form-cont">
            <select class="select-box">
              <option>시스템 등록에서 설정한 값</option>
            </select>
          </div>
        </li>
        <li>
          <label class="label point">요청 handler 그룹</label>
          <div class="form-cont">
            <!--  multi select -->
            <div class="multi-wrap">
              <div class="select-row">handler 그룹을 선택해주세요</div>
              <!--  dropdown시 active class 추가-->
              <div class="select-form none">
                <!--  dropdown시 block class 추가-->
                <ul>
                  <li>
                    <span>API & Login Authentication Group</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 2</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 3</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 4</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                </ul>
              </div>
            </div>
            <!--  // multi select -->
          </div>
        </li>
        <li>
          <label class="label point">응답 handler 그룹</label>
          <div class="form-cont">
            <!--  multi select -->
            <div class="multi-wrap">
              <div class="select-row">handler 그룹을 선택해주세요</div>
              <!--  dropdown시 active class 추가-->
              <div class="select-form none">
                <!--  dropdown시 block class 추가-->
                <ul>
                  <li>
                    <span>API & Login Authentication Group</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 2</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 3</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                  <li>
                    <span>API & Login Authentication 4</span>
                    <a href="" class="multi-btn"></a>
                  </li>
                </ul>
              </div>
            </div>
            <!--  // multi select -->
          </div>
        </li>
        <li>
          <label class="label point">타임아웃(ms)</label>
          <div class="form-cont">
            <input type="text" id="" class="input-box lg" placeholder="number" />
          </div>
        </li>
        <li>
          <label for="" class="label">시스템 설명</label>
          <div class="form-cont">
            <textarea class="textarea"></textarea>
          </div>
        </li>
      </ul>
    </template>

    <template v-slot:buttons>
      <!-- 레이아웃과 컨텐츠를 제외한 나머지 버튼들을 넣어주세요 -->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">등록</button>
        <button class="lg-btn white-btn">취소</button>
      </div>
    </template>
  </ContentLayout>
</template>

<script lang="ts">
import InfoGroup from '@/components/api/detail/InfoGroup.vue';
import MethodGroup from '@/components/api/detail/MethodGroup.vue';
import URIGroup from '@/components/api/detail/URIGroup.vue';
import ContentLayout from '@/components/layout/ContentLayout.vue';
import Vue from 'vue';
import Component from 'vue-class-component';
import { DummyApiResponse, dummyData } from '@/types/ApiType';

@Component({
  components: {
    InfoGroup,
    MethodGroup,
    URIGroup,
    ContentLayout,
  },
})
export default class ApiRegisterPage extends Vue {}
</script>
