export let comments = []

export const addComment = (newComment) => {
    comments.unshift(newComment)
}

export const removeComment = (commentId) => {
    comments = comments.filter((comment) => comment.id !== commentId)
}

export const toggleLike = (commentId) => {
    const comment = comments.find((c) => c.id === commentId)
    if (comment) {
        comment.liked = !comment.liked
        comment.likes += comment.liked ? 1 : -1
    }
}

export const updateComments = (newComments) => {
    comments = newComments
}
