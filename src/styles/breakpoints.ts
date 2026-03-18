import { mq as themeMq, theme } from '@closet-design-system/theme-connect';

export const mq = themeMq(theme.breakpoints);

export const BREAKPOINT_M = theme.breakpoints.m ?? 1200;
