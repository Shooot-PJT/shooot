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
    item: {
      cpu: {
        backgroundColor: themeCss.color.item.cpu,
      },
      memory: { backgroundColor: themeCss.color.item.memory },
      disk: { backgroundColor: themeCss.color.item.disk },
      network: { backgroundColor: themeCss.color.item.network },
    },
  },
});

export const text = recipe({
  base: {
    fontWeight: '600',
  },
  variants: {
    item: {
      cpu: {
        color: themeCss.color.item.cpu,
      },
      memory: { color: themeCss.color.item.memory },
      disk: { color: themeCss.color.item.disk },
      network: { color: themeCss.color.item.network },
    },
  },
});
