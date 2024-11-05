import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#e0e0e0',
  },

  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#e0e0e0',
    color: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
