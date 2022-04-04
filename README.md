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

### 5. root 경로는 @로 접근

```
// Good but not use
import Hello from '../components/HelloWorld.vue';


// Even better!
import Hello from '@/components/HelloWorld.vue';
```

## Git Rule

-
