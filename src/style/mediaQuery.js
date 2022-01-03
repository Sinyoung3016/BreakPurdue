const breakpoints = { sm: 576, md: 768, lg: 992, xl: 1500 };
export const mq = (type) => `@media (max-width: ${breakpoints[type]}px)`;
