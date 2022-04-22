<template>
  <!------- contents area -------->
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">API 정보 수정</h1>
      <div class="directory-wrap">
        <span>API 관리</span>
        <i><img src="@/assets/arrow_right.svg" alt="디렉토리목록" /></i>
        <span>API 정보 수정</span>
      </div>
    </div>

    <div class="box comp">
      <div class="box-tit">
        <h2 class="h2-tit">기본정보 수정</h2>
      </div>

      <!--- form field --->
      <div class="form-wrap">
        <ul>
          <li>
            <label for="" class="label point">시스템명</label>
            <div class="form-cont">
              <select class="select-box disable" disabled>
                <option>선택해주세요</option>
              </select>
            </div>
          </li>
          <li>
            <label for="" class="label point">API ID</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg" placeholder="placeholder" disabled />
            </div>
          </li>
          <li>
            <label for="" class="label point">API 명</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg" placeholder="placeholder" disabled />
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
              <input type="text" id="" class="input-box lg check-ok" placeholder="number" />
            </div>
          </li>
          <li>
            <label for="" class="label">시스템 설명</label>
            <div class="form-cont">
              <textarea class="textarea"></textarea>
            </div>
          </li>
        </ul>
      </div>
      <!--- // form field --->

      <!--- btn-wrap --->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn" @click="$router.push('/api-detail')">
          수정
          <!-- <router-link to="/api-detail"> </router-link> -->
        </button>
        <button class="lg-btn white-btn" @click="$router.go(-1)">취소</button>
      </div>
      <!--- // btn-wrap --->
    </div>
    <!--- // comp --->
  </article>
  <!------- // contents area -------->
  <!-- <ContentLayout title="API 정보 수정" subTitle="기본정보 수정" depth="API 관리">
    <template v-slot:contents>
      <ul>
        <InputGroup inputNm="시스템명" :place="dumyData.sysNm" inputClass="input-box lg" :disabled="true" />
        <InputGroup inputNm="시스템 ID" :place="dumyData.sysId" inputClass="input-box lg" :disabled="true" />
        <h1>====</h1>
        <InfoSelectGroup inputNm="시스템명" :options="['a', 'b', 'c']" :disabled="true" />
        <li>
          <label for="" class="label point">시스템명</label>
          <div class="form-cont">
            <select class="select-box disable">
              <option>선택해주세요0</option>
              <option>선택해주세요1</option>
              <option>선택해주세요2</option>
            </select>
          </div>
        </li>
        <h1>====</h1>
        <InputGroup
          inputNm="담당자 이름"
          :place="dumyData.mgrNm"
          inputClass="input-box lg check-false"
          validCheck="중복된 API ID 입니다."
        />
        <InputGroup inputNm="소속" :place="dumyData.belong" inputClass="input-box lg check-ok" />
        <InputGroup inputNm="E-mail" :place="dumyData.eMail" inputClass="input-box lg check-ok" />
        <LinkGroup inputNm="연동방식" :linkType="dumyData.linkType" />
        <TextAreaGroup inputNm="시스템 설명" />
      </ul>
    </template>
    <template v-slot:buttons>
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">저장</button>
        <button class="lg-btn white-btn">취소</button>
      </div>
    </template>
  </ContentLayout> -->
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentLayout from '@/components/layout/ContentLayout.vue';

import EditSelectGroup from '@/components/api/edit/EditSelectGroup.vue';
import InputGroup from '@/components/system/InputGroup.vue';
import LinkGroup from '@/components/system/LinkGroup.vue';
import TextAreaGroup from '@/components/system/TextAreaGroup.vue';
import { DummySystemResponse, dummyData } from '@/types/SystemType';

@Component({
  components: {
    ContentLayout,
    InputGroup,
    LinkGroup,
    TextAreaGroup,
    EditSelectGroup,
  },
})
export default class ApiEditPage extends Vue {
  get dumyData(): DummySystemResponse {
    return dummyData;
  }
}
</script>
<style lang=""></style>
