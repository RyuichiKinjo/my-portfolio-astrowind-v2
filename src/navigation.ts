import { getPermalink } from './utils/permalinks';

export const profile = {
  name: 'Ryuichi Kinjo',
  email: 'playground.rk@gmail.com',
  github: 'https://github.com/RyuichiKinjo',
  x: 'https://x.com/rkplayground',
};

export const mailtoLink = `mailto:${profile.email}`;

export const headerData = {
  links: [
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Experience', href: getPermalink('/#experience') },
    { text: 'Skills', href: getPermalink('/#skills') },
    { text: 'Works', href: getPermalink('/#works') },
    { text: 'Tech Stack', href: getPermalink('/#stack') },
  ],
  actions: [{ text: 'Contact', href: mailtoLink }],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: profile.github },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: profile.x },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: mailtoLink },
  ],
  footNote: `© ${new Date().getFullYear()} ${profile.name}`,
};
