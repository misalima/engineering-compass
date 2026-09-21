import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconOverview(props: IconProps) {
  return <IconBase {...props}><path d="M4 4h6v6H4zM14 4h6v3h-6zM14 11h6v9h-6zM4 14h6v6H4z" /></IconBase>;
}

export function IconRoute(props: IconProps) {
  return <IconBase {...props}><circle cx="5" cy="18" r="2" /><circle cx="19" cy="6" r="2" /><path d="M7 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3h1" /></IconBase>;
}

export function IconEvidence(props: IconProps) {
  return <IconBase {...props}><path d="M6 3h9l3 3v15H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></IconBase>;
}

export function IconLibrary(props: IconProps) {
  return <IconBase {...props}><path d="M4 5h5v15H4zM10 5h5v15h-5zM16 7l4-1 2 14-4 1z" /></IconBase>;
}

export function IconSettings(props: IconProps) {
  return <IconBase {...props}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></IconBase>;
}

export function IconPlus(props: IconProps) {
  return <IconBase {...props}><path d="M12 5v14M5 12h14" /></IconBase>;
}

export function IconArrow(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14M14 7l5 5-5 5" /></IconBase>;
}

export function IconClose(props: IconProps) {
  return <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>;
}
