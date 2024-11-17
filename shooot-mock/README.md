# Shooot

저희의 Shooot 서비스 잘 사용하고 계신가요? `shooot` 라이브러리는 서비스와 연계하여 사용할 수 있습니다. 아직 가입 전이라면 방문해서 가입하고 당신만의 프로젝트, API 문서를 작성해보세요!

**[shooot.co.kr](https://shooot.co.kr)** 방문하기

Service Worker 를 기반으로 작성하신 API 문서의 모킹 데이터(example response)를 반환해주는 라이브러리입니다.

<br/>

## 0. 사전 준비

라이브러리를 적용하기 위한 프로젝트 환경을 준비해주세요.<br />
여기서는 TypeScript 기반 React 프로젝트로 설명하고 있습니다.

```bash
# my-project 는 본인이 원하는 프로젝트 이름
npx create-react-app my-project --template typescript

# 프로젝트 이동
cd my-project
```

<br />

## 1. 라이브러리 설치

`shooot` 라이브러리를 본인의 프로젝트에 설치해보세요.

```bash
# shooot 라이브러리 설치
npm install shooot

# 구현된 service worker 의 동작
npx shooot init <DIR>
```

-   service worker 동작시키기 위해 설정해둔 init script 를 실행시켜 받아주세요
-   React, Vue 등의 프로젝트 환경이라면 public 폴더의 경로를, 외에는 원하는 파일의 경로를 입력해주세요

<br />

## 2. 시작

**service worker 동작**

```typescript
import shooot from "shooot";

// src/index.tsx
if (process.env.NODE_ENV === "development") {
    shooot.register();
} else {
    shooot.unregister();
}
```

위의 예시는 프로젝트가 시작되는 순간 바로 service worker 를 활성화하기 위해 index.tsx 에서 등록 절차를 수행했어요. 원하는 곳에서, 원하는 환경에서 service worker 를 자유롭게 등록, 해제 해보세요.

<br />

## 3. Options

> **projectName**

Type: string<br/>
Default: undefined

shooot 서비스에 등록해주신 프로젝트의 영문명입니다. 이후의 mocking 을 하기 위해서는 projectName 을 등록해주셔야만 합니다.

```javascript
import shooot from 'shooot';

...

await shooot.axios.get(`https://${shooot.projectName}.com/url`);
```

본인의 프로젝트의 도메인에 projectName 이 포함되거나 하는 등의 경우에서 사용할 수 있습니다.

<br />

> **axios**

라이브러리의 axios 는 기존의 axios 를 활용하고 있습니다. 따라서, 기존 axios 가 제공하는 모든 기능을 그대로 사용할 수 있습니다.

```javascript
await shooot.axios.get("url",
    { // configs
        params: {
            "testcase": 3,
            ...
        },
        ...
    }
)

await shooot.axios.post("url",
    { ... }, // data(body)
    { // configs
        params: {
            "testcase": 2,
            ...
        },
        ...
    }
)

// put, patch, delete 도 동일한 형태
```

기존의 axios 에 한 가지 기능이 추가되었습니다. 저희 서비스를 통해 API 문서를 작성하시면 API 마다 status code 별로 여러 가지의 케이스를 등록하실 수 있습니다. 그 테스트 케이스들 중에 몇 번째(1번부터 시작) 테스트 케이스의 mocking 을 원하는지 request parameter 로 담아주시면 service worker 의 동작 상태, api request 의 정보에 맞춰 동작합니다.

```
- service worker 가 동작중이면?
    - test case 정보를 담고 있는가? (n 이라 가정)
        - n 번째 test case 가 shooot 서비스에 등록되어 있는가?
            - n 번째 test case 의 example response 반환

        - n 번째 test case 가 shooot 서비스에 등록되어 있지 않는가?
            - 결과 반환이 불가능하다는 에러 반환

    - test case 정보를 담고 있지 않는가?
        - api 의 첫 번째 test case 확인 (status_code 오름차순 기준)
            - "200 OK" 에 대한 test case 가 등록되어 있는가?
                - "200 OK" 에 대한 example response 반환

            - "200 OK" 에 대한 test case 가 등록되어 있지 않는가?
                - test case 를 등록해달라는 에러 반환

- service worker 가 동작 중이지 않는가?
    - test case 정보를 담고 있는가?
        - test case 정보 제거 후 요청 전송

    - test case 정보를 담고 있지 않는가?
        - 그대로 요청 전송
```

<br />

## 4. Method

> **register**

Parameters: none<br/>
Returns: Promise\<void>

service worker 를 등록하기 위한 메소드입니다. 브라우저마다 service worker 의 사용 가능 여부, 등록 결과 등의 결과를 콘솔에 출력해줍니다.

> **unregister**

Parameters: none<br />
Returns: Promise\<void>

service worker 를 등록 해제하기 위한 메소드입니다.

> **setConfigs**

Parameters: "projectName: string"<br />
Returns: Promise\<void>

service worker 가 동작하는 상황에서만 사용 가능합니다. 저희의 서비스에 가입하고 생성하신 프로젝트의 영문명을 매개변수로 넘겨주셔야 합니다. projectName 의 등록 여부를 판단하고 service worker 에게 적용시키게 됩니다.

```javascript
import { useEffect } from 'react';
import shooot from 'shooot'

// src/App.tsx
function App() {
    const uploadConfig = async () => {
        await shooot.setConfig("project english name");
    }

    useEffect(() => {
        uploadConfig();
    }, []);

    return (
        ...
    )
}

export default App;
```

위의 예시는 App 컴포넌트에서 렌더링 후 즉시 등록하는 과정입니다.
