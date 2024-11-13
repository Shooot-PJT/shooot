import { recipe } from '@vanilla-extract/recipes';
import themeCss from '../../../../styles/theme.css';

export const Icon = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    color: 'black',
  },
  variants: {
    state: {
      정상종료: {
        backgroundColor: themeCss.color.stateicon.approved,
      },
      배포중: { backgroundColor: themeCss.color.stateicon.pending },
      런타임에러: { backgroundColor: themeCss.color.stateicon.disabled },
      빌드에러: { backgroundColor: themeCss.color.stateicon.error },
      빌드기록없음: { backgroundColor: themeCss.color.stateicon.notbuilded },
    },
  },
});

export const text = recipe({
  base: {
    fontWeight: '600',
  },
  variants: {
    state: {
      정상종료: {
        color: themeCss.color.stateicon.approved,
      },
      배포중: { color: themeCss.color.stateicon.pending },
      런타임에러: { color: themeCss.color.stateicon.disabled },
      빌드에러: { color: themeCss.color.stateicon.error },
      빌드기록없음: { color: themeCss.color.stateicon.notbuilded },
    },
  },
});
