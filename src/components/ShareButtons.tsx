import React from 'react';
import { Share2, Twitter, Linkedin, Pin } from 'lucide-react';
import { buildShareLinks } from '../utils/share';

interface ShareButtonsProps {
  productName: string;
  productSubtitle: string;
  productRef: string;
  imageUrl?: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({
  productName,
  productSubtitle,
  productRef,
  imageUrl
}) => {
  const currentUrl =
    typeof window !== 'undefined' ? window.location.href : '';
  const origin =
    typeof window !== 'undefined' ? window.location.origin : '';

  const links = buildShareLinks({
    url: currentUrl,
    title: `${productName} (${productRef})`,
    description: productSubtitle,
    imageUrl,
    origin
  });

  const platforms = [
    {
      id: 'twitter',
      label: 'X / Twitter',
      href: links.twitter,
      icon: Twitter,
      ariaLabel: `Partager ${productName} sur X (Twitter)`
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: links.linkedin,
      icon: Linkedin,
      ariaLabel: `Partager ${productName} sur LinkedIn`
    },
    {
      id: 'pinterest',
      label: 'Pinterest',
      href: links.pinterest,
      icon: Pin,
      ariaLabel: `Épingler ${productName} sur Pinterest`
    }
  ] as const;

  return (
    <div
      className="border-t border-surface pt-5 mb-6"
      aria-label="Partager la fiche produit"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-ink">
          <Share2 size={13} strokeWidth={1.75} className="text-muted" aria-hidden="true" />
          <span>Partager l'édition</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {productRef}
        </span>
      </div>

      <div className="grid grid-cols-3 border-t border-l border-surface">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <a
              key={platform.id}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform.ariaLabel}
              className="group flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-2 sm:px-3 border-r border-b border-surface bg-bg text-ink hover:bg-ink hover:text-bg hover:border-ink transition-colors focus-visible:z-10"
            >
              <Icon
                size={13}
                strokeWidth={1.75}
                className="shrink-0 text-muted group-hover:text-alert transition-colors"
                aria-hidden="true"
              />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-medium whitespace-nowrap">
                {platform.label}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
