/** GitHub numeric user IDs never change, unlike usernames. */
export function isOwnerGithubId(githubId: unknown, ownerId = process.env.AUTH_OWNER_GITHUB_ID) {
  return Boolean(ownerId) && githubId != null && String(githubId) === ownerId;
}

export function sessionIsOwner(session: unknown) {
  return isOwnerGithubId((session as { githubId?: string } | null)?.githubId);
}
