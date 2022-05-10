<template>
  <div id="app" class="body-wrap">
    <!------- handler pop -------->
    <div class="pop-wrap lg-pop">
      <div class="pop-header">
        <h1 class="h1-tit">API 권한관리</h1>
        <button>
          <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
        </button>
      </div>

      <div class="pop-container">
        <div class="api-wrap">
          <div class="comp">
            <div class="search-form">
              <input class="input-box" type="text" placeholder="API 검색" />
            </div>
            <ul class="api-list">
              <li>
                <a class="stick">시스템_A</a>
                <div class="api-group">
                  <div class="check-all">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="checkAll" /><span class="checkmark"></span></div>
                      <label for="checkAll">전체 선택</label>
                    </div>
                  </div>
                  <div class="check-group">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_A_API _01</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_A_API _02</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_A_API _03</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_A_API _04</label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a class="stick">시스템_B</a>
                <div class="api-group">
                  <div class="check-all">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="checkAll" /><span class="checkmark"></span></div>
                      <label for="checkAll">전체 선택</label>
                    </div>
                  </div>
                  <div class="check-group">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_B_API _01</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_B_API _02</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_B_API _03</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_B_API _04</label>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <a class="stick">시스템_C</a>
                <div class="api-group">
                  <div class="check-all">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="checkAll" /><span class="checkmark"></span></div>
                      <label for="checkAll">전체 선택</label>
                    </div>
                  </div>

                  <div class="check-group">
                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_C_API _01</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_C_API _02</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_C_API _03</label>
                    </div>

                    <div class="check-box">
                      <div class="check"><input type="checkbox" id="" /><span class="checkmark"></span></div>
                      <label for="checkGet">시스템_C_API _04</label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="comp gray">
            <div class="box-tit">
              <h3 class="h3-tit">권한 부여 된 API</h3>
              <p class="total">total : <span>6</span></p>
            </div>

            <div class="api-cont">
              <div class="api-stick">
                <span>시스템_A_API_01</span>
                <button>
                  <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
                </button>
              </div>
              <div class="api-stick">
                <span>시스템_A_API_02</span>
                <button>
                  <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
                </button>
              </div>
              <div class="api-stick">
                <span>시스템_A_API길어지면 _03</span>
                <button>
                  <i><img src="@/assets/close.svg" alt="닫기" title="닫기" /></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  // pop-container   -->

      <div class="pop-footer">
        <button class="lg-btn purple-btn">저장</button>
        <button class="lg-btn white-btn">취소</button>
      </div>
    </div>

    <!------- handler pop -------->
  </div>
</template>
