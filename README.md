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

### 3.Component 구분

- 컴포넌트 객체는 각각의 파일로 구분.

```
// Bad
@Component
class HelloWorld1 extends Vue {
  @Prop() private msg!: string;
}
@Component
class HelloWorld2 extends Vue {
  @Prop() private msg!: string;
}


// Good
components/
|- HelloWorld1.vue
|- HelloWorld2.vue
```

### 4. 싱글 파일 컴포넌트 이름 규칙 지정(casing)

- 단일 파일 구성 요소의 파일 이름은 항상 PascalCase 로 작성
  (폴더명은 CamelCase)

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

### 5. root 경로는 @로 접근

```
// Good but not use
import Hello from '../components/HelloWorld.vue';


// Even better!
import Hello from '@/components/HelloWorld.vue';
```

### 6. Component 아래와 같이 선언

```
@Component({
  components: {
    Button,
    Input,
  },
})
```

### 7. store 모듈 내 메서드를 component에서 참조 시 메서드 명 통일하는 방식으로 사용

```
  @UserModule.Action
  private getUserListAction!: (page: number) => void;
```

### 8. 함수 선언 방법은 ES6문법 사용

```
[ES6] const getUserList = async(page: string)=>{}

[ES5] async function getUserList(page: string) {}

```

### 9. Component는 재사용을 위해 Store 접근,api 통신 등의 코드가 없어야 한다.

### @MutationAction 사용 지양

#### 사유 :

- VScode의 Go to Definetion등이 정상 동작하지 않음
- 기존 state값을 가져와 값을 추가시키는(array의 .add메서드 등)동작이 정상 동작하지 않음

## Git Rule

-

##
