import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M12.3126 7.14474C12.0211 6.85327 11.8754 6.70753 11.8208 6.53948C11.7727 6.39166 11.7727 6.23242 11.8208 6.0846C11.8754 5.91655 12.0211 5.77081 12.3126 5.47934L14.4017 3.39027C13.8473 3.13956 13.2319 3 12.5839 3C10.145 3 8.16781 4.97713 8.16781 7.41605C8.16781 7.77746 8.21122 8.12873 8.29312 8.46493C8.38083 8.82495 8.42468 9.00496 8.41689 9.11868C8.40874 9.23774 8.39099 9.30108 8.33608 9.40704C8.28364 9.50825 8.18316 9.60873 7.9822 9.80969L3.4573 14.3347C2.84756 14.9444 2.84757 15.933 3.4573 16.5427C4.06704 17.1524 5.05561 17.1524 5.66534 16.5427L10.1902 12.0177C10.3912 11.8168 10.4917 11.7163 10.5929 11.6638C10.6989 11.6089 10.7622 11.5912 10.8813 11.583C10.995 11.5752 11.175 11.6191 11.535 11.7068C11.8712 11.7887 12.2225 11.8321 12.5839 11.8321C15.0228 11.8321 17 9.85497 17 7.41605C17 6.76806 16.8604 6.15267 16.6097 5.5983L14.5206 7.68737C14.2292 7.97884 14.0834 8.12457 13.9154 8.17918C13.7675 8.22721 13.6083 8.22721 13.4605 8.17918C13.2924 8.12457 13.1467 7.97884 12.8552 7.68737L12.3126 7.14474Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
export { SvgComponent as Tool };