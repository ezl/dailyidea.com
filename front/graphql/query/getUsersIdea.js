export default `
query getUsersIdea($userId: String!, $ideaId: String!) {
  getUsersIdea(userId: $userId, ideaId: $ideaId) {
    ideaId
    userId
    shortId
    slug
    authorSlug
    authorName
    content
    title
    createdDate
    ideaDate
    likesCount
    commentsCount
    visibility

    fileAttachments
    imageAttachments
    previewImage
    viewsCount
  }
}`
