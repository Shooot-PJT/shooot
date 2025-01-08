# 📖 SHOOOT!

<div align="center">

<img width="100%" src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F193bc778-37ba-4dc0-99f4-293090bed8ed%2F%25EC%258A%2588%25EC%259B%2583_%25EA%25B0%2580%25EB%25A1%259C%25EC%258D%25B8%25EB%2584%25A4%25EC%259D%25BC.png?table=block&id=164662ac-98f1-8079-971c-c15728777639&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=2000&userId=&cache=v2" />

<br/>

> **주니어 개발자를 위한 GUI 기반, 개발 편의성 지원 솔루션**

<br/><br/>

### 전용 라이브러리

> shooot 라이브러리는 서비스와 연계하여 사용할 수 있습니다.

```
npm install shooot
```

🔖 [NPM SHOOOT! 바로가기](https://www.npmjs.com/package/shooot)

[![npm](https://img.shields.io/npm/v/shooot)](https://www.npmjs.com/package/shooot)

<br/><br/>

</div>

<br/><br/>

---

📅 **2024.10.14 ~ 2024.11.19 (5주)**

- 기획 : 1주
- 설계 : 1주
- 개발 : 3주

- 1차 테스트 : 2024.11.08
- 최종 테스트 : 2024.11.15

<br/>

👤 **팀 구성 (6명)**

- Frontend 3명
- Backend 3명

---

<br/><br/>

## 🌱 SHOOOT! 팀원 소개 🌱

| <img src="https://github.com/yh-project.png" width="100%" height="100" /> | <img src="https://github.com/ABizCho.png" width="100%" height="100" /> | <img src="https://github.com/altys31.png" width="100%" height="100" /> | <img src="https://github.com/khj745700.png" width="100%" height="100" /> | <img src="https://github.com/miiniipark.png" width="100%" height="100" /> | <img src="https://github.com/jangcheolhyeon.png" width="100%" height="100" /> |
| :-----------------------------------------------------------------------: | :--------------------------------------------------------------------: | :--------------------------------------------------------------------: | :----------------------------------------------------------------------: | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------------: |
|                               최요하 `팀장`                               |                                 조성우                                 |                                 양규현                                 |                                  김현진                                  |                                  박민희                                   |                                    장철현                                     |
|                                 Frontend                                  |                             Frontend 리더                              |                                Frontend                                |                               Backend 리더                               |                                  Backend                                  |                                    Backend                                    |
|                   회원<br/>프로젝트 관리<br/>모킹 서버                    |                 API Docs<br/>알림 SSE<br/>동작 테스트                  |                 배포 등록<br/>모니터링<br/>부하 테스트                 |             인증 및 인가<br/>배포 자동화</br>콘솔 로그 조회              |                                    --                                     |                     API Docs<br/>알림 SSE<br/>동작 테스트                     |

<br/><br/>

## 프로젝트 개요

개발 초기 설계단계의 **API 명세서** 작성부터 **API 모킹**, **테스트**, **배포**, **알림**까지,  
모든 과정을 **하나의 플랫폼**에서 직관적으로 관리할 수 있다면 얼마나 편리할까요?

**SHOOOT!** 은

- **주니어 개발자**가 복잡한 설정 없이도 팀원들과 함께 체계적으로 **API 명세서를 작성**하고,

- 명세 변경 사항을 **실시간 알림**으로 구독받아 **불필요한 커뮤니케이션**과 오개발의 휴먼 에러를 줄이며,
- SHOOO!에서 작성한 API 명세서와 연동된 **NPM 모킹 라이브러리**를 통해 API 모킹 단계를 자동화하고,
- **테스트 케이스 등록**부터 **실시간 성능 모니터링**, **자동 배포**, **부하 테스트**까지  
  **원스톱**으로 처리할 수 있는 올인원 협업 플랫폼입니다.

<br/><br/>

## 주요 기능

### 1. API 명세서 작성 및 변경 알림

- **도메인** / **엔드포인트** / **파라미터** / **응답 형식** 등을 GUI 환경에서 등록
- 변경사항 발생 시 담당자가 **SSE** 기반으로 알림을 받음 → 실시간으로 확인 가능

### 2. API 테스트 케이스 & 동작 테스트

- 사전에 정의된 요청/응답 요구사항에 맞게 **테스트 케이스**를 등록
- **한 번의 클릭**으로 실제 API가 정상 동작하는지 바로 확인
- **로그 조회**를 통해 에러 원인 파악 및 디버깅 지원

### 3. 알림 & 구독

- 명세서 변경 알림 **구독** 설정
- 명세서 수정, 팀원 초대, 테스트 결과 등 다양한 이벤트를 **즉시** 확인
- **읽지 않은 알림 갯수**, **알림 읽기** 처리 등도 SSE 방식으로 간편하게 동기화

### 4. 명세서 기반 프론트엔드 Mocking

- 아직 구현되지 않은 API도 **SHOOOT!** 에서 정의된 명세를 토대로 Mock 서버를 자동 생성
- **프론트엔드**가 백엔드가 준비되기 전부터 개발을 **병렬**로 진행 가능

### 5. 서버 배포 · JAR 파일 관리

- **JAR 파일**을 업로드하면 자동으로 **도커 컨테이너**에서 실행
- **실시간 로그**와 **상태**(CPU, 메모리, I/O)를 SSE 기반으로 모니터링
- 배포 중지, 배포 재시작 등도 **UI**에서 직관적으로 제어

### 6. 부하(성능) 테스트

- **부하 스크립트**나 별도 설정 없이도, 원하는 **엔드포인트** 또는 **테스트 케이스**에 대해  
  **성능 테스트**를 실행
- 결과(처리량, 응답 시간 등)와 **시각화 그래프**를 제공해 성능 병목 지점을 빠르게 파악 가능

<br/><br/>

<details>
<summary><h2>서비스 대상</h2></summary>

<br/>

- API 명세 작성, 수정이 자주 일어나는 **팀 프로젝트**에서 협업 중이신 분
- 스펙 불일치로 인해 **프론트-백엔드 간 충돌**을 겪어본 적이 있으신 분
- **테스트**와 **배포**를 쉽게 자동화하고 싶으신 분
- **부하 테스트**, **성능 모니터링** 등의 기능을 편리하게 사용하고 싶은 주니어 개발자

<br/>

</details>

<details>
<summary><h2>✨ 서비스 장점</h2></summary>

<br/>

1. **API 명세-코드 불일치 최소화, 팀 협업 극대화**

   - API 명세서 변경 사항 알림 구독으로 **실시간**으로 인지, 빠르게 대응
   - 잦은 커뮤니케이션과 오소통 방지를 통한 비용이 크게 감소
   - SHOOOT! 서비스의 API 문서와 연동된 `NPM 모킹 자동화 라이브러리`를 통한 프론트엔드 개발 생산성 극대화

2. **간편한 테스트 & 배포**

   - 로컬 환경 설정 없이도 **클릭 몇 번**으로 **API 테스트**와 **서버 배포** 가능
   - 주니어 개발자도 **CI/CD**와 **모니터링**을 쉽게 경험

3. **생산성 향상**

   - API 명세서 작성, API 모킹, 테스트, 배포, 모니터링 등 **흩어져 있던 업무**를 **원스톱**으로 처리
   - 불필요한 작업을 **자동화**해, 핵심 개발 로직에 더 많은 시간을 투자

4. **부하 테스트 & 성능 모니터링**
   - **CPU**, **메모리**, **Disk/Network I/O** 등 **실시간** 모니터링, 문제 발생 시 즉각 대응
   - **테스트 이력**을 저장·비교해 **API별 성능 추이**를 한눈에 파악

<br/>

</details>

<div align="center">

## 🖥️ 화면 예시

## 회원 & 프로젝트

|                                                                                                                                                                                                   **프로젝트 생성**                                                                                                                                                                                                   |                                                                                                                                                                                                 **프로젝트 리스트**                                                                                                                                                                                                 |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Fc2b58778-d3a3-4f7e-a819-d4da5f330511%2Fscreencapture-shooot-co-kr-2024-11-22-13_35_46.png?table=block&id=164662ac-98f1-806e-8031-d416f4d04a9d&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=2000&userId=&cache=v2" alt="프로젝트 생성" width="100%" /> | <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F97e068ac-1736-43d1-bfcf-2e12f4d41610%2Fscreencapture-shooot-co-kr-2024-11-22-13_35_03.png?table=block&id=164662ac-98f1-8010-907e-e9cca552e45a&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1340&userId=&cache=v2" alt="내 프로젝트" width="100%" /> |

|                                          **프로젝트 관리 (GIF)**                                           |                                          **팀원 관리 (GIF)**                                           |
| :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
| <img src="./result_source/screen/gif/project/G2_SHOOOT_프로젝트관리.gif" alt="내 프로젝트" width="100%" /> | <img src="./result_source/screen/gif/project/G1_SHOOOT_팀원관리.gif" alt="내 프로젝트" width="100%" /> |

<br/>

## API 명세서

|                                                                                                                                                                                                                                                          **도메인 목록**                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                                    **API 목록**                                                                                                                                                                                                                                                     |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F7d92eada-e075-41f3-b0ec-89e7d9613a02%2F%25EC%258A%2588%25EC%259B%2583_API%25EB%25AC%25B8%25EC%2584%259C_1_%25EB%258F%2584%25EB%25A9%2594%25EC%259D%25B8%25EB%25A6%25AC%25EC%258A%25A4%25ED%258A%25B8.png?table=block&id=15e662ac-98f1-804f-8ac6-e18de02aff84&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=2000&userId=&cache=v2" alt="도메인 목록" width="100%" /> | <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Fa29d25f8-d385-48cd-aa12-f7ec50bc15f4%2F%25EC%258A%2588%25EC%259B%2583_API%25EB%25AC%25B8%25EC%2584%259C_2_API%25ED%2597%25A4%25EB%258D%2594%25EB%25A6%25AC%25EC%258A%25A4%25ED%258A%25B8.png?table=block&id=15e662ac-98f1-80c5-82ad-d7773f935c27&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1340&userId=&cache=v2" alt="API 목록" width="100%" /> |

|                                                                                                                                                                                                                                                     **API 상세**                                                                                                                                                                                                                                                      |                                                                                                                                                                                                                                                                              **테스트케이스 상세**                                                                                                                                                                                                                                                                              |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Ffd28f268-0bb5-4002-a82a-bbc34903562f%2F%25EC%258A%2588%25EC%259B%2583_API%25EB%25AC%25B8%25EC%2584%259C_4_API%25EC%2583%2581%25EC%2584%25B8_%25EC%259E%2585%25EB%25A0%25A5%25EB%2590%259C.png?table=block&id=164662ac-98f1-80af-871d-c56e47d4a019&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=2000&userId=&cache=v2" alt="API 상세" height="100%" /> | <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F995f4fd7-76d9-456a-ba9d-ba4b18545e72%2F%25EC%258A%2588%25EC%259B%2583_API%25EB%25AC%25B8%25EC%2584%259C_5_%25ED%2585%258C%25EC%258A%25A4%25ED%258A%25B8%25EC%25BC%2580%25EC%259D%25B4%25EC%258A%25A4%25EC%2583%2581%25EC%2584%25B8_GET_200.png?table=block&id=164662ac-98f1-8036-8927-efbc2eb82d24&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=2000&userId=&cache=v2" alt="테스트케이스 상세" height="100%" /> |

|                                 **도메인 추가/편집/삭제 (GIF)**                                 |                                  **API 추가 / 수정 / 삭제 (GIF)**                                  |
| :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| <img src="./result_source/screen/gif/apidocs/G2_도메인작업.gif" alt="API 상세" height="100%" /> | <img src="./result_source/screen/gif/apidocs/G3_API_생성_편집.gif" alt="API 상세" height="100%" /> |

|                               **테스트케이스 추가 / 수정 / 삭제 (GIF)**                                |                                    **ReqBody - FormData 추가 케이스 시연 (GIF)**                                    |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: |
| <img src="./result_source/screen/gif/apidocs/G4_테스트케이스_작업.gif" alt="API 상세" height="100%" /> | <img src="./result_source/screen/gif/apidocs/G7_API_상세편집_FormData_사진저장.gif" alt="API 상세" height="100%" /> |

<br/>

## 서버 테스트 실행기

|                                    **백엔드 파일 등록 (GIF)**                                    |                                        **배포 모니터링 (GIF)**                                        |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| <img src="./result_source/screen/gif/tester/G1_SHOOOT_JAR등록.gif" alt="jar등록" width="100%" /> | <img src="./result_source/screen/gif/tester/G2_SHOOOT_서버배포.gif" alt="부하 테스트" width="100%" /> |

|                                                                                                                                                                                           **테스트 설정**                                                                                                                                                                                            |                                   **서버 테스트 (GIF)**                                   |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F28c89adc-a6ab-4e3f-8a30-984340d2cd94%2F%25EB%25B3%25B4%25EB%2593%259C2.png?table=block&id=164662ac-98f1-80ea-b1ec-ccd04b0ac0a1&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1150&userId=&cache=v2" alt="테스트 설정" width="100%" /> | <img src="./result_source/screen/gif/tester/G3_SHOOOT_서버테스트실행.gif" width="100%" /> |

|                                                                                                                                                                                          **API 연동 목록**                                                                                                                                                                                          |                                                                                                                                                                                                   **테스트 이력**                                                                                                                                                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F629a1dbf-c355-4baf-8cb0-f8ac967a3211%2F%25EB%25B3%25B4%25EB%2593%259C.png?table=block&id=164662ac-98f1-808d-8f85-e2196787ac0d&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1150&userId=&cache=v2" alt="부하 테스트" width="100%" /> | <img src="https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Fe847df66-7add-43f4-badb-7f3f19cc903f%2Fscreencapture-shooot-co-kr-2024-11-22-13_44_34.png?table=block&id=15e662ac-98f1-8074-8497-e8368a7fa8b9&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1340&userId=&cache=v2" alt="테스트 이력" width="100%" /> |

</div>

<br/><br/>

## ⚙ 기술 스택

### **Front-End**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vanilla-Extract](https://img.shields.io/badge/Vanilla%20Extract-FFB703?style=for-the-badge&logo=css3&logoColor=white)
![Tanstack Query](https://img.shields.io/badge/Tanstack%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-7D5F0F?style=for-the-badge&logo=Zustand&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=Electron&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

### **Back-End**

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

### **Infra & CI/CD**

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Traefik](https://img.shields.io/badge/Traefik-24A1C1?style=for-the-badge&logo=traefikproxy&logoColor=white)
![VirtualBox](https://img.shields.io/badge/VirtualBox-183A61?style=for-the-badge&logo=virtualbox&logoColor=white)
![Vagrant](https://img.shields.io/badge/Vagrant-1563FF?style=for-the-badge&logo=vagrant&logoColor=white)

### **협업 & 기타**

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Mattermost](https://img.shields.io/badge/Mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white)

<br/><br/>

## 📄 API 목록

### [API 명세서 전체보기](https://pinnate-domain-1cd.notion.site/11fb6e4092238082a941da09b2954a2b?v=11fb6e409223812da73d000c1eb20340&pvs=74)

![api 명세 일부](https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Ff261d5c1-dd77-4644-8157-b0441072bd80%2Fimage.png?table=block&id=164662ac-98f1-80f0-969c-c235a9fd46b7&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1420&userId=&cache=v2)

> **주요 API**
>
> - **User**: 회원가입, 로그인, 로그아웃, 프로필 조회/수정 등
> - **Project**: 프로젝트 생성/수정/삭제, 팀원 초대, 참여자 관리 등
> - **API Docs**: 도메인 등록, 엔드포인트 관리, 테스트 케이스, 구독, 알림 등
> - **Testing**: JAR 파일 업로드, 배포/중지, 부하 테스트, 로그 조회 등

<br/><br/>

## 🧱 서비스 아키텍처

![아키텍쳐 예시2](https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F338203ce-0362-4e06-9abd-a5569a378b3a%2Fimage.png?table=block&id=164662ac-98f1-80ce-9cdc-dbe77aabcd43&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1420&userId=&cache=v2)
![아키텍쳐 예시1](https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2F15e59746-71e3-4a31-a5a6-0004d12dc446%2Fimage.png?table=block&id=164662ac-98f1-8059-9e21-d59541c6f3b5&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1420&userId=&cache=v2)

<br/><br/>

## 📊 ERD

![ERD 예시](https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Ff261d5c1-dd77-4644-8157-b0441072bd80%2Fimage.png?table=block&id=164662ac-98f1-80f0-969c-c235a9fd46b7&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1420&userId=&cache=v2)

<br/><br/>

## 🖼️ 와이어프레임

![와이어프레임 예시](https://habitual-girl-529.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F8209545d-08d5-4c83-ba01-ae14044a712a%2Fb1fd0de6-3ff8-4302-8197-02655b6df2a1%2Fimage.png?table=block&id=164662ac-98f1-8010-aabe-c82670a590b3&spaceId=8209545d-08d5-4c83-ba01-ae14044a712a&width=1420&userId=&cache=v2)

<br/><br/>

## 📊 Jira

![지라 예시](https://pinnate-domain-1cd.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F2e96358d-f933-4a87-81fc-684f8690de40%2F8d5b8c9f-8b64-4a17-9d40-0775286796a6%2Fimage.png?table=block&id=63cef94e-ba44-4cb5-86ca-a4c04591ab3c&spaceId=2e96358d-f933-4a87-81fc-684f8690de40&width=1200&userId=&cache=v2)

> 프로젝트 태스크, 일정관리를 위해 jira를 사용했습니다. 주단위 스프린트를 진행했습니다.

<br/><br/>

---

<div align="center">

### 감사합니다!

**SHOOOT!** 으로  
개발 효율과 협업 생산성을 극대화해 보세요.

</div>
