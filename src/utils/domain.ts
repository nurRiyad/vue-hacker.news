export function getDomainName(url: string | undefined): string {
  if (!url) return ''

  try {
    return new URL(url).hostname
  } catch {
    return ''
  }
}
