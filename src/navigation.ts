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
    { text: 'プロフィール', href: getPermalink('/#about') },
    { text: '職歴', href: getPermalink('/#career') },
    { text: 'スキル', href: getPermalink('/#skills') },
    { text: '実績', href: getPermalink('/#works') },
  ],
  actions: [{ text: 'お問い合わせ', href: mailtoLink }],
};

export const footerData = {
  links: [],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: profile.github },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: profile.x },
    { ariaLabel: 'メール', icon: 'tabler:mail', href: mailtoLink },
  ],
  footNote: `© ${new Date().getFullYear()} ${profile.name}`,
};
