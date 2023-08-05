## Todo App

원티드 프리온보딩 프론트엔드 인턴십 선별 과제 Todo App 입니다.

## 지원자

이윤정

## 프로젝트 실행 방법

```
git clone https://github.com/337yj/wanted-pre-onboarding-frontend.git

npm install
npm start
```

## 배포링크

🔗 http://wanted-todo-app.s3-website.ap-northeast-2.amazonaws.com

## 폴더 구조

```
📂 src
   ├─ api # 서버 요청 api
   │  ├─ Auth
   │  ├─ Todo
   │  └─ apiClient.ts
   │
   ├─ components
   │  └─ Layout
   │     └─ Header
   │  
   ├─ context
   │  └─ AuthContext.tsx # access token 관리 컨텍스트
   │ 
   ├─ pages
   │  ├─ Auth
   │  │  ├─ AuthInput
   │  │  ├─ SignIn # 로그인 페이지
   │  │  ├─ SignUp # 회원가입 페이지
   │  │  └─ validation # 유효성 검사 로직
   │  │ 
   │  ├─ NotFound
   │  │  
   │  ├─ ProtectedRoute # access token 유무에 따른 페이지 접근 제어
   │  │  
   │  └─ TodoList # 투두리스트 페이지
   │     └─ TodoItem
   │  
   ├─ router
   │  
   ├─ styles # reset, 전역 스타일, scss 변수
   │  ├─ _base.scss
   │  ├─ _font_face.scss
   │  ├─ _reset.scss
   │  ├─ constants # colors
   │  ├─ fonts
   │  ├─ global.scss
   │  └─ mixins # flexbox
   │
   ├─ types # UserAuth, Todo 타입
   └─ index.js
```
