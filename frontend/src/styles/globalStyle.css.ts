import { globalStyle, globalFontFace } from '@vanilla-extract/css';

/* 글로벌 폰트 설정 */
globalFontFace('Pretendard', {
  src: `local('Pretendard'), url(/src/assets/fonts/PretendardVariable.woff2) format('woff2')`,
});

/* 글로벌 스타일 설정 */
globalStyle('*', {
  fontFamily: 'Pretendard',
});
