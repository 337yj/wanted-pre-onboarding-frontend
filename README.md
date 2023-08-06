## Todo App

원티드 프리온보딩 프론트엔드 인턴십 선별 과제 Todo App 입니다.

<br/>

## 지원자

이윤정

<br/>

## 프로젝트 실행 방법

```
git clone https://github.com/337yj/wanted-pre-onboarding-frontend.git

npm install
npm start
```

<br/>

## 배포링크

🔗 http://wanted-todo-app.s3-website.ap-northeast-2.amazonaws.com

<br/>

## 데모 영상

<table>
 <tr>
    <td ><b>회원가입</b></td>
    <td ><b>로그인</b></td>		
  </tr>
  <tr>
    <td>   
      <img width="75%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/27aebcc4-313f-4cb3-a511-d5e1025b46b4" />
    </td>
    <td>   
      <img  width="100%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/c58cd46f-6939-4a6d-89c5-068cd8858434" />
    </td>
  </tr>
  <tr>
    <td>ㆍ 유효성 검사<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 이메일 조건: @ 포함<br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 비밀번호 조건: 8자 이상<br/>
    ㆍ 유효성 검사 통과시 버튼 활성<br/>
    ㆍ 회원가입 정상 완료 시 /signin 경로로 이동
    </td>
    <td>ㆍ 로그인 정상 완료 시 /todo 경로로 이동<br/>
    ㆍ 로컬 스토리지에 access token 저장<br/>
    ㆍ 로컬 스토리지에 토큰 유무에 따른 리다이렉트
    </td>		
</tr>
 <tr>
    <td ><b>TODO 추가</b></td>
    <td ><b>TODO 수정</b></td>		
  </tr>
  <tr>
    <td>   
      <img   width="75%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/d052f3dc-f87b-4e3c-8005-acdca422e2c9" />
    </td>
    <td>   
      <img   width="100%" src="https://github.com/337yj/wanted-pre-onboarding-frontend/assets/110447844/988a5dd9-05cc-4b95-959a-69c12529ee3a" />
    </td>
  </tr>
  <tr>
    <td>ㆍ 새로운 TODO 추가<br/>
    </td>
    <td>ㆍ 체크박스를 통해 완료 여부 수정<br/>
    ㆍ TODO 우측 버튼을 통해 수정, 수정 취소, 삭제 <br/>
    </td>		
</tr>
</table>

<br/>

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
   │  ├─ NotFound 
   │  ├─ ProtectedRoute # access token 유무에 따른 페이지 접근 제어
   │  └─ TodoList # 투두리스트 페이지
   │     └─ TodoItem
   │  
   ├─ router
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
