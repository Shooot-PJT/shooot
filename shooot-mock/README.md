# Shooot

저희의 Shooot 서비스 잘 사용하고 계신가요? `shooot` 라이브러리는 서비스와 연계하여 사용할 수 있습니다. 아직 가입 전이라면 방문해서 가입하고 당신만의 프로젝트, API 문서를 작성해보세요!

**[shooot.co.kr](https://shooot.co.kr)** 방문하기

Service Worker 를 기반으로 작성하신 API 문서의 모킹 데이터(example response)를 반환해주는 라이브러리입니다.

## 0. 사전 준비

라이브러리를 사용하기 위해 React, Vue, Vanilla 등의 프로젝트 환경을 준비해주세요.<br />
여기서는 TypeScript 기반 React 프로젝트로 설명하고 있습니다.

**0-1. 프로젝트 생성**

```bash
npx create-react-app my-project --template typescript
```

-   my-project : 본인이 원하는 프로젝트 이름으로 변경해보세요.

**0-2. 프로젝트로 이동**

```bash
cd my-project
```

## 1. 라이브러리 설치

`shooot` 라이브러리를 본인의 프로젝트에 설치해보세요.

**1-1. 설치**

```bash
npm install shooot
```

**1-2. service worker**

```bash
npx shooot init <DIR>
```

-   React 혹은 Vue 라면 public 폴더의 경로를 입력해주세요.
-   Vanilla 환경이라면 원하는 경로를 입력해주세요.

## 2. 사용

**2-1. import**

```typescript
import shooot from "shooot";
```

-   프로젝트의 루트 경로에서 import 해주세요.

**2-2. service worker 동작**

```typescript
// src/index.tsx
await shooot.controller().then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    root.render(<App />);
});
```

-   controller 메소드는 1개의 매개변수를 전달할 수 있어요.
-   만약 아무 값도 주지 않는다면 개발 환경에서는 service worker 를 동작, 배포 환경에서는 동작하지 않도록 제어하고 있어요.
-   동작시킬 환경을 바꾸고싶다면 매개변수로 원하는 모드를 넘겨주세요.
