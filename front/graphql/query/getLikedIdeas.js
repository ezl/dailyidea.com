export default `
query getLikedIdeas($nextToken: String, $limit: Int) {
  getLikedIdeas(nextToken: $nextToken, limit: $limit) {
    items {
      ideaId
      shortId
      slug
      authorAvatar
      authorName
      authorSlug
      userId
      content
      title
      createdDate
      ideaDate
      likesCount
      savesCount
      commentsCount
    }
    nextToken
  }
}`
