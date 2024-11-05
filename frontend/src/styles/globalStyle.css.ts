import { globalStyle, globalFontFace, style } from '@vanilla-extract/css';

/* 글로벌 폰트 설정 */
globalFontFace('Pretendard', {
  src: `local('Pretendard'), url(/src/assets/fonts/PretendardVariable.woff2) format('woff2')`,
});

/* 글로벌 스타일 설정 */
globalStyle('*', {
  margin: 0,
  outline: 'none',
  fontFamily: 'Pretendard',
  WebkitTapHighlightColor: 'transparent',
});

globalStyle('::-webkit-scrollbar', {
  display: 'none',
});

/* 반응형 - 데스크톱 */
export const desktop = style({
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'block',
    },

    'screen and (max-width: 767px)': {
      display: 'none',
    },
  },
});

/* 반응형 - 모바일 */
export const mobile = style({
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },

    'screen and (max-width: 767px)': {
      display: 'block',
    },
  },
});
