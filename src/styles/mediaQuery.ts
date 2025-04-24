const pcQuery = () => `@media all and (min-width: 1141px)`;
const tabletQuery = () => `@media all and (min-width:601px) and (max-width: 1140px)`;
const mobileQuery = () => `@media all and (max-width: 600px)`;

export const media = {
  pc: pcQuery,
  tablet: tabletQuery,
  mobile: mobileQuery,
};
