import { comments, addComment } from './comments.js'
import { sanitizeHtml } from './utilts.js'
import { renderComments } from './renderComments.js'

export const initEventHandlers = () => {
    const authorInput = document.getElementById('author')
    const commentTextInput = document.getElementById('comment-text')
    const addCommentBtn = document.getElementById('add-comment')

    addCommentBtn.addEventListener('click', () =>
        handleAddComment(authorInput, commentTextInput),
    )

    commentTextInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleAddComment(authorInput, commentTextInput)
        }
    })
}

const handleAddComment = (authorInput, commentTextInput) => {
    const author = authorInput.value.trim()
    const text = commentTextInput.value.trim()

    if (!author || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    const newComment = {
        id: Date.now(),
        author: sanitizeHtml(author),
        text: sanitizeHtml(text),
        date: new Date().toISOString(),
        likes: 0,
        liked: false,
    }

    addComment(newComment)
    renderComments()

    authorInput.value = ''
    commentTextInput.value = ''
}
