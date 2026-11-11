import { getPermalink } from './utils/permalinks';

export const profile = {
  name: 'Ryuichi Kinjo',
  email: 'playground.rk@gmail.com',
  github: 'https://github.com/RyuichiKinjo',
  x: 'https://x.com/rkplayground',
  youtube: 'https://www.youtube.com/@rk-playground',
  niconico: 'https://www.nicovideo.jp/user/25040646',
};

export const mailtoLink = `mailto:${profile.email}`;

export const headerData = {
  links: [
    { text: 'Experience', href: getPermalink('/#experience') },
    { text: 'Skills', href: getPermalink('/#skills') },
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
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: profile.youtube },
    { ariaLabel: 'ニコニコ動画', icon: 'niconico', href: profile.niconico },
    { ariaLabel: 'Email', icon: 'tabler:mail', href: mailtoLink },
  ],
  footNote: `© ${new Date().getFullYear()} ${profile.name}`,
};
