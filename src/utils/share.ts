export interface SharePayload {
  url: string;
  title: string;
  description: string;
  imageUrl?: string;
  origin?: string;
}

export interface ShareLinks {
  twitter: string;
  linkedin: string;
  pinterest: string;
}

export function resolveAbsoluteUrl(pathOrUrl: string, origin?: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  if (!origin) return pathOrUrl;
  const cleanOrigin = origin.replace(/\/+$/, '');
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${cleanOrigin}${cleanPath}`;
}

export function buildShareLinks({
  url,
  title,
  description,
  imageUrl,
  origin
}: SharePayload): ShareLinks {
  const absoluteUrl = resolveAbsoluteUrl(url, origin) || url;
  const absoluteImage = imageUrl ? resolveAbsoluteUrl(imageUrl, origin) : '';

  const twitterParams = new URLSearchParams({
    url: absoluteUrl,
    text: `${title} — ${description}`
  });

  const linkedinParams = new URLSearchParams({
    url: absoluteUrl
  });

  const pinterestParams = new URLSearchParams({
    url: absoluteUrl,
    description: `${title} — ${description}`
  });
  if (absoluteImage) {
    pinterestParams.set('media', absoluteImage);
  }

  return {
    twitter: `https://twitter.com/intent/tweet?${twitterParams.toString()}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?${linkedinParams.toString()}`,
    pinterest: `https://pinterest.com/pin/create/button/?${pinterestParams.toString()}`
  };
}
