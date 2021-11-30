const breakpoints = { mobile: 576 };
export const mq = (type) => `@media (max-width: ${breakpoints[type]}px)`;
