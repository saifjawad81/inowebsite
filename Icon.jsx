// Small, local line icons. No remote icon requests or large icon package.
const paths = {
  arrow: ['M5 12h14', 'm13 6 6 6-6 6'],
  chevron: ['m9 5 7 7-7 7'],
  plus: ['M12 5v14', 'M5 12h14'],
  minus: ['M5 12h14'],
  check: ['m5 12 4 4L19 6'],
  menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  server: ['M4 3h16v7H4z', 'M4 14h16v7H4z', 'M7 6.5h.01', 'M7 17.5h.01', 'M11 6.5h6', 'M11 17.5h6'],
  shield: ['M12 3 3.5 6v6c0 4.5 4.5 7.5 8.5 9 4-1.5 8.5-4.5 8.5-9V6L12 3Z', 'm8 12 3 3 5-6'],
  cpu: ['M6 6h12v12H6z', 'M9 9h6v6H9z', 'M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4'],
  network: ['M9 3h6v5H9z', 'M3 16h6v5H3z', 'M15 16h6v5h-6z', 'M12 8v4M6 16v-4h12v4'],
  bolt: ['m13 2-9 12h7l-1 8 10-13h-7l1-7Z'],
  globe: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', 'M3 12h18', 'M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z'],
  message: ['M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5a9.5 9.5 0 0 1 19 0Z', 'M7 10h9', 'M7 14h6'],
  mail: ['M3 5h18v14H3z', 'm3 5 9 8 9-8'],
  phone: ['m7 3 3 5-3 2c2 4 3 5 7 7l2-3 5 3c0 3-2 5-5 4C9 19 5 15 3 8 2 5 4 3 7 3Z'],
  pin: ['M19 10c0 5-7 12-7 12S5 15 5 10a7 7 0 0 1 14 0Z', 'M14.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z'],
  file: ['M5 3h9l5 5v13H5z', 'M14 3v6h5', 'M8 13h8', 'M8 17h6'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M4 16v5h16v-5'],
  lock: ['M5 10h14v11H5z', 'M8 10V7a4 4 0 0 1 8 0v3', 'M12 14v3'],
  compass: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', 'm16 8-3 5-5 3 3-5 5-3Z'],
  layers: ['m12 3 10 5-10 5L2 8l10-5Z', 'm2 12 10 5 10-5', 'm2 16 10 5 10-5'],
  tool: ['M14 4a5 5 0 0 0-6 6L3 17a2 2 0 0 0 4 4l7-7a5 5 0 0 0 6-6l-4 4-4-4 2-4Z'],
  alert: ['m12 3 10 18H2L12 3Z', 'M12 9v5', 'M12 17h.01'],
};
export default function Icon({ name = 'arrow', size = 24, className = '', ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className={className} {...props}>{(paths[name] || paths.arrow).map((d, i) => <path key={i} d={d} />)}</svg>;
}
