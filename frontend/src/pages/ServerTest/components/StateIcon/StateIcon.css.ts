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
      Approved: {
        backgroundColor: themeCss.color.stateicon.approved,
      },
      Pending: { backgroundColor: themeCss.color.stateicon.pending },
      Disabled: { backgroundColor: themeCss.color.stateicon.disabled },
      Error: { backgroundColor: themeCss.color.stateicon.error },
      NotBuilded: { backgroundColor: themeCss.color.stateicon.notbuilded },
    },
  },
});

export const text = recipe({
  base: {
    fontWeight: '600',
  },
  variants: {
    state: {
      Approved: {
        color: themeCss.color.stateicon.approved,
      },
      Pending: { color: themeCss.color.stateicon.pending },
      Disabled: { color: themeCss.color.stateicon.disabled },
      Error: { color: themeCss.color.stateicon.error },
      NotBuilded: { color: themeCss.color.stateicon.notbuilded },
    },
  },
});
