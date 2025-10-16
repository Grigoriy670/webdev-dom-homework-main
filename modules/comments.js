export let comments = [
    {
        id: 2,
        author: 'Глеб Фокин',
        text: 'Это будет первый комментарий на странице',
        date: new Date().toISOString(),
        likes: 3,
        liked: false,
    },
    {
        id: 1,
        author: 'Варвара Н.',
        text: 'Мне нравится как офрмленна эта страница! 🤍',
        date: new Date().toISOString(),
        likes: 75,
        liked: true,
    },
]

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
