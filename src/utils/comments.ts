export function formatCommentCount(count: number | undefined): string {
  const total = count ?? 0
  return `${total} ${total === 1 ? 'Comment' : 'Comments'}`
}
