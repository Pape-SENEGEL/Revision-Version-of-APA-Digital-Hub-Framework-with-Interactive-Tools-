import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { TwitterIcon, FacebookIcon, LinkedInIcon } from './IconComponents';

interface SocialShareButtonsProps {
  url: string;
  title: string;
  titleKey: string;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ url, title, titleKey }) => {
  const { t } = useLanguage();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const platforms = [
    {
      name: 'Twitter',
      icon: <TwitterIcon className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      colorClass: 'hover:text-[#1DA1F2]',
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      colorClass: 'hover:text-[#4267B2]',
    },
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon className="w-5 h-5" />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      colorClass: 'hover:text-[#0077b5]',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 border-b pb-3 mb-4">{t(titleKey)}</h3>
      <div className="flex items-center justify-center space-x-4">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Share on ${platform.name}`}
            className={`text-slate-500 transition-colors duration-200 ${platform.colorClass}`}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialShareButtons;
