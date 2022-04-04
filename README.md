# agile-front-template

## Code Convention

### 1. VSCode Setting -> format on Save 기능 On

- 저장 시 자동으로 prettier 규칙에 맞게 파일 format을 변경해준다.

### 2. Prettier Rule

- printWidth : 100  
  // 줄 바꿈 폭의 너비

- tabWidth : 2  
  // tab = space x 2

- singleQuote : true  
  // 문자열 작성 시 '문자열'

- semi : true  
  // 세미콜론 사용

### 3. Props 정의

- Prop 정의는 적어도 타입은 명시되도록 가능한 상세하게 정의.

```
  // Bad
  props: ['status']

  // Good
  props: {
    status: String
  }
  // Even better!
  props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
        return [
            'syncing',
            'synced',
            'version-conflict',
            'error'
        ].indexOf(value) !== -1
      }
    }
  }
  </code>
```

### 4.Component 구분

- 컴포넌트 객체는 각각의 파일로 구분.

```
// Bad
Vue.component('TodoList', {
  // ...
})

Vue.component('TodoItem', {
  // ...
})

// Good
components/
|- TodoList.js
|- TodoItem.js
components/
|- TodoList.vue
|- TodoItem.vue
```

### 5. 싱글 파일 컴포넌트 이름 규칙 지정(casing)

- 단일 파일 구성 요소 의 파일 이름은 항상 PascalCase 로 작성

```
// Bad
components/
|- mycomponent.vue
components/
|- myComponent.vue


// Good
components/
|- MyComponent.vue
```

### 6. root 경로는 @로 접근

```
// Good but not use
import Hello from '../components/HelloWorld.vue';


// Even better!
import Hello from '@/components/HelloWorld.vue';
```
