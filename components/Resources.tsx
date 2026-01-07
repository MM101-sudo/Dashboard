
import React from 'react';
import { Youtube, Globe, ExternalLink, Bookmark } from 'lucide-react';

export const Resources: React.FC = () => {
  const links = [
    {
      title: 'YouTube Channel',
      description: 'Video guides on mastering your money mindset and everyday financial skills.',
      url: 'https://www.youtube.com/channel/UCA7f0cyx6AP0X4HwEU84Kyw/',
      icon: Youtube,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
    {
      title: 'Everyday Money Skills Blog',
      description: 'In-depth articles and resources to help you build better financial habits.',
      url: 'https://everydaymoneyskills.blogspot.com/',
      icon: Globe,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    }
  ];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Resources</h2>
        <p className="text-sm text-gray-500">Learn more about financial literacy and skills.</p>
      </header>

      <div className="space-y-4">
        {links.map((link, idx) => {
          const Icon = link.icon;
          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${link.bg} ${link.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {link.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <Bookmark className="w-5 h-5 text-gray-400" />
          <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Quick Note</h4>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Consistent learning is the fastest way to financial freedom. Bookmark these links to stay updated with the latest tips and strategies.
        </p>
      </div>
    </div>
  );
};
