<template>
  <!------- contents area -------->
  <article class="contents-wrap">
    <div class="tit-wrap">
      <h1 class="h1-tit">시스템 등록</h1>
      <div class="directory-wrap">
        <span>시스템 관리</span>
        <i><img src="@/assets/arrow_right.svg" alt="디렉토리목록" /></i>
        <span>시스템 등록</span>
      </div>
    </div>

    <div class="box comp">
      <div class="box-tit">
        <h2 class="h2-tit">기본정보 등록</h2>
      </div>

      <!--- form field --->
      <div class="form-wrap">
        <ul>
          <li>
            <label for="" class="point">시스템명</label>
            <div class="form-cont">
              <input
                type="text"
                id=""
                class="input-box lg check-ok"
                placeholder="[백엔드시스템명_양식]"
              />
            </div>
          </li>
          <li>
            <label for="" class="point">시스템 ID</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg" placeholder="placeholder" />
            </div>
          </li>
          <li>
            <label for="" class="point">담당자 이름</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg check-false" placeholder="placeholder" />
              <p class="red-txt noti">중복된 API ID 입니다.</p>
            </div>
          </li>
          <li>
            <label for="" class="point">소속</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg check-ok" placeholder="placeholder" />
            </div>
          </li>
          <li>
            <label for="" class="point">E-mail</label>
            <div class="form-cont">
              <input type="text" id="" class="input-box lg check-ok" placeholder="placeholder" />
            </div>
          </li>
          <li>
            <label for="" class="point">연동방식</label>
            <div class="form-cont">
              <div class="domain-wrap">
                <select>
                  <option>https</option>
                  <option>http</option>
                </select>
                <span>://</span>
                <input type="text" id="" class="input-box mid" placeholder="도메인" />
                <span>:</span>
                <input type="text" id="" class="input-box sm" placeholder="port" />
                <button>
                  <i><img src="@/assets/plus.svg" alt="추가" /></i>
                </button>
              </div>
              <div class="domain-wrap">
                <select>
                  <option>https</option>
                  <option>http</option>
                </select>
                <span>://</span>
                <input type="text" id="" class="input-box mid" placeholder="도메인" />
                <span>:</span>
                <input type="text" id="" class="input-box sm" placeholder="port" />
                <button>
                  <i><img src="@/assets/minus.svg" alt="삭제" /></i>
                </button>
              </div>
              <div class="domain-wrap">
                <select>
                  <option>https</option>
                  <option>http</option>
                </select>
                <span>://</span>
                <input type="text" id="" class="input-box mid" placeholder="도메인" />
                <span>:</span>
                <input type="text" id="" class="input-box sm" placeholder="port" />
                <button>
                  <i><img src="@/assets/minus.svg" alt="삭제" /></i>
                </button>
              </div>
            </div>
          </li>
          <li>
            <label for="" class="point">시스템 설명</label>
            <div class="form-cont">
              <textarea class="textarea"></textarea>
            </div>
          </li>
        </ul>
      </div>
      <!--- // form field --->

      <!--- btn-wrap --->
      <div class="btn-wrap">
        <button class="lg-btn purple-btn">등록</button>
        <button class="lg-btn white-btn">취소</button>
      </div>
      <!--- // btn-wrap --->
    </div>
    <!--- // comp --->
  </article>
  <!------- // contents area -------->
</template>
<script>
export default {};
</script>
<style lang=""></style>
