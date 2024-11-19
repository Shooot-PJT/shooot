# Gitlab 소스 클론 이후 빌드 및 배포할 수 있도록 정리한 문서

1. 사용한 JVM, 웹서버, WAS 제품 등의 종류와 설정 값, 버전(IDE버전 포함)기재
2. 빌드 시 사용되는 환경 변수 등의 내용 상세 기재
3. 배포 시 특이사항 기재
4. DB접속 정보 등 프로젝트(ERD)에 활용되는 주요 계정 및 프로퍼티가 정의된 파일 목록

사용도구
---------------
 - 이슈 관리 : Jira
 - 형상 관리 : GitLab
 - 커뮤니케이션 : Notion, MatterMost
 - 디자인 : Figma
 - CI/CD : Jenkins

개발도구
----------------
- Backend
    - Intellij Ultimate 2024.1.4
    - Visual Studio Code : 1.93

개발환경
----------------
**BackEnd**
| 언어 | 버전 |
| --- | --- |
| Java | 17 |
| Springboot | 3.3.3 |
| Spring Security | newest |
| Spring Data JPA | newest |
| Spring Data Redis | newest |

### Database

| 언어 | 버전 |
| --- | --- |
| Mysql | 8.10 |
| Redis | 7.2.1 |

### Infra

| 언어 | 버전 |
| --- | --- |
| Jenkins | 2.477 |
| Nginx | 1.25.2 |
| VirtualBox | 7.1.4 |
| Vagrant | 2.4.3 |
| Ec2 | 2.3.978.0 |
| Docker Stack | 3 |
| Traefik | 3.2.0 |

EC2 포트번호
----------------
- Backend : 8080
- MySQL : 44132
- Redis : 44131

# 프로젝트에서 사용하는 외부 서비스 정보를 정리한 문서

[application-dev](./application-dev.yml)
[application-secret](./application-secret.yml)
[docker-compose](./docker-compose.yml)
[Dockerfile](./Dockerfile)

# DB 덤프 파일 최신본

[DB](./schema.sql)

# 시연 시나리오

### 내 프로젝트 페이지

1. 사전에 준비한 프로젝트로 진입 
    - **board 프로젝트**
2. 팀원 초대
    - 성우2 : [he12569@gmail.com](mailto:he12569@gmail.com)
3. 팀원 추방
    - 추방 : 수평
        - he12569@naver.com

### API Docs 페이지

1. 도메인 리스트 구경
2. 도메인 하나 골라서 API 리스트 구경
3. 도메인 알림 구독 누르기
4.  알림함 열고 닫기
5. 1번 API 하나 잡아서 Test Case 리스트 구경
---

1. BOARD의 1번 도메인의 1번 API의 (게시판 도메인 : 게시글 조회)
    
    테스트케이스 버튼 클릭하여 테스트
    
2. 해당 API의 테스트 로그 확인

### 3. 서버 테스트 실행기

1. BOARD 프로젝트로 접속 후, 서버 테스트 실행기 페이지
2. 기존에 떠있는 기록들 구경
3. jar 파일 업로드
    
    
4. 배포 시작
    - (**10~15초 가량 걸림)**
    
5. 로그 뜨는거 확인
6. API 목록 확인
    
    
7. 테스트 실행 버튼 클릭
8. **/users/my-info** (( GET ))에 대해 **테스트 설정 클릭**
    - 100명
    - 25초
    - FIXED
    
    ⇒ **테스트 설정 버튼** **닫기** 
    
    **⇒ 테스트 여부 체크**
    
9. **SHOOOT 버튼 클릭**
    - 처음에 테스트중인 API에 대기중 떠있다가, API 바뀌는거 캐치
    - 그래프랑 테이블이랑 값나오는거
11. **테스트 종료**
12. 테스트 이력 확인
    - 최근 테스트 이력 중 가장 최근 거
13. 배포 중단

### 4. Mocking 시연

1. **프로젝트 생성** - 영문명은 반드시 demo 로 해주세요
    - 프로젝트: 싸피 프로젝트
    - 영문명 : demo-project
    - 메모: 간단한 프로젝트입니다.
2. **도메인 생성** - 아무 정보 입력하시면 됩니다
    - 도메인 이름 : auth
    - 도메인 설명 : 인증 관련 도메인입니다.
3. **API 생성

생성
-** 담당자: **맨 위에 아무나**
- API 이름: **로그인 API**
- API 설명: **로그인을 처리하는 API입니다.**
- 엔드포인트 : **/auth/login**

1. **API 펼치기

2. API 편집** **클릭**
메서드 : **POST

3. API 요청 명세서 편집 클릭**
    - 예시 URL 붙여넣기:  
          https://demo-project.shooot.shop/api/auth/login
    - Req Body 탭 클릭
    - Raw 버튼 클릭 후 아래 정보 기입 후,
    
    ```json
    {
    	"id": "id",
    	"password": "password"
    }
    ```
    
    - 저장 버튼 클릭
    
    1. 테스트 케이스 추가 클릭
        
        **첫번째 케이스 생성, 저장**
        
        ```tsx
        제목: 로그인 성공
        HTTP STATUS CODE: 200
        
        요청 타입
        request - body
        {
        	"id": "id",
        	"password": "password"
        }
        
        response - schema
        {
        	"id": "Text",
        	"password": "Text"
        }
        
        response - example
        {
        	"nickname": "my-nickname",
        	"email": "ssafy@gmail.com",
        	"tel": "010-0000-0000"
        }
        ```
        
        **두번째 케이스 생성, 저장**
        
        ```json
        제목: 아이디 또는 비밀번호 미입력
        HTTP STATUS CODE 400
        
        ---
        Body 탭 :(raw)
        {
        	"id": "id"
        }
        
        ---
        응답 타입
        {
        	"id": "Text"
        }
        
        ---
        실제 응답 
        {
        	"statusCode": 400,
        	"msg": "아이디 또는 비밀번호가 입력되지 않았어요!"
        }
        ---
        ```
