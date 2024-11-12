import {
  AddTestCaseRequestBody,
  AddTestCaseResponse,
} from '../../../../../apis/testcase/types';

// 테스트 케이스 등록 요청 1. 회원가입 요청 케이스
export const signUpRequest: AddTestCaseRequestBody = {
  title: '회원가입 요청',
  httpStatusCode: 200,
  type: 'MULTIPART',
  content: {
    params: {
      locale: ['ko_KR', '사용자 언어 설정', 'Text', true],
    },
    headers: {
      ContentType: ['multipart/form-data', null, null, null],
      Authorization: ['', null, null, null],
    },
    pathvariable: null,
    body: {
      formData: {
        datas: {
          username: ['홍길동', '사용자 이름', 'Text', true],
          email: ['gildong@example.com', '사용자 이메일', 'Text', true],
          password: ['securepassword123', '비밀번호', 'Text', true],
          phoneNumber: ['010-1234-5678', '휴대전화 번호', 'Text', false],
        },
        files: {
          UUID1: {
            profile_image: [
              'base64로 인코딩된 문자열 코드라고 가정',
              '사용자 프로필 사진',
              'File',
              true,
            ],
          },
        },
      },
      raw: null,
    },
    expectedResponse: {
      schema:
        "[{\n  'userId': number,\n  'userName': string,\n  'email': string\n }...]\n",
      example: [
        {
          userId: 123,
          userName: '홍길동',
          email: 'gildong@example.com',
        },
      ],
    },
  },
};

// 테스트 케이스 등록 응답 1. 회원가입 요청 케이스
export const signUpResponse: AddTestCaseResponse = {
  id: 101,
  apiId: 10,
  title: '회원가입 응답',
  httpStatusCode: 200,
  type: 'MULTIPART',
  apiTestCaseRequestId: 1001,
  requestType: 'MULTIPART',
  content: {
    params: {
      locale: ['ko_KR', '사용자 언어 설정', 'Text', true],
    },
    headers: {
      ContentType: ['multipart/form-data', null, null, null],
      Authorization: ['', null, null, null],
    },
    pathvariable: null,
    body: {
      formData: {
        datas: {
          username: ['홍길동', '사용자 이름', 'Text', true],
          email: ['gildong@example.com', '사용자 이메일', 'Text', true],
          password: ['securepassword123', '비밀번호', 'Text', true],
          phoneNumber: ['010-1234-5678', '휴대전화 번호', 'Text', false],
        },
        files: {
          UUID1: {
            profile_image: [
              'base64로 인코딩된 문자열 코드라고 가정',
              '사용자 프로필 사진',
              'File',
              true,
            ],
          },
        },
      },
      raw: null,
    },
    expectedResponse: {
      schema:
        "[{\n  'userId': number,\n  'userName': string,\n  'email': string\n }...]\n",
      example: [
        {
          userId: 123,
          userName: '홍길동',
          email: 'gildong@example.com',
        },
      ],
    },
  },
};

// 테스트 케이스 등록 요청 2. 로그인 요청 케이스
export const loginRequest: AddTestCaseRequestBody = {
  title: '로그인 요청',
  httpStatusCode: 200,
  type: 'JSON',
  content: {
    params: null,
    headers: {
      ContentType: ['application/json', null, null, null],
    },
    pathvariable: null,
    body: {
      formData: null,
      raw: {
        datas: {
          username: 'gildong',
          password: 'securepassword123',
        },
        files: null,
      },
    },
    expectedResponse: {
      schema: "{ 'token': string, 'userId': number }",
      example: {
        token: 'abcdef123456',
        userId: 123,
      },
    },
  },
};

// 테스트 케이스 등록 응답 2. 로그인 요청 케이스
export const loginResponse: AddTestCaseResponse = {
  id: 102,
  apiId: 11,
  title: '로그인 응답',
  httpStatusCode: 200,
  type: 'JSON',
  apiTestCaseRequestId: 1002,
  requestType: 'JSON',
  content: {
    params: null,
    headers: {
      ContentType: ['application/json', null, null, null],
    },
    pathvariable: null,
    body: {
      formData: null,
      raw: {
        datas: {
          username: 'gildong',
          password: 'securepassword123',
        },
        files: null,
      },
    },
    expectedResponse: {
      schema: "{ 'token': string, 'userId': number }",
      example: {
        token: 'abcdef123456',
        userId: 123,
      },
    },
  },
};

// 테스트 케이스 등록 요청 3. 상품 상세 조회 요청
export const getProductDetailRequest: AddTestCaseRequestBody = {
  title: '상품 상세 조회 요청',
  httpStatusCode: 200,
  type: 'NONE',
  content: {
    params: {
      lang: ['ko', '언어 설정', 'Text', true],
    },
    headers: {
      Authorization: ['Bearer xyz789token', null, null, null],
    },
    pathvariable: {
      productId: ['prod12345', '상품 ID', 'Text', true],
    },
    body: {
      formData: null,
      raw: null,
    },
    expectedResponse: {
      schema: "[{\n 'productId': string,\n 'productName': string\n }...]\n",
      example: [
        {
          productId: 'prod12345',
          productName: '새로운 상품',
        },
      ],
    },
  },
};

// 테스트 케이스 등록 응답 3. 상품 상세 조회 응답
export const getProductDetailResponse: AddTestCaseResponse = {
  id: 105,
  apiId: 14,
  title: '상품 상세 조회 응답',
  httpStatusCode: 200,
  type: 'NONE',
  apiTestCaseRequestId: 1005,
  requestType: 'GET',
  content: {
    params: {
      lang: ['ko', '언어 설정', 'Text', true],
    },
    headers: {
      Authorization: ['Bearer xyz789token', null, null, null],
    },
    pathvariable: {
      productId: ['prod12345', '상품 ID', 'Text', true],
    },
    body: {
      formData: null,
      raw: null,
    },
    expectedResponse: {
      schema: "[{\n 'productId': string,\n 'productName': string\n }...]\n",
      example: [
        {
          productId: 'prod12345',
          productName: '새로운 상품',
        },
      ],
    },
  },
};
