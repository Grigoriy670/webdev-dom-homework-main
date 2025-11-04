import { comments, addComment, updateComments } from './comments.js'
import { sanitizeHtml } from './utilts.js'
import { renderComments } from './renderComments.js'
import { postComment } from './api.js'

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

    postComment(sanitizeHtml(text), sanitizeHtml(author))
    .then((data)=>{
        updateComments(data)
        renderComments()
        authorInput.value = ''
        commentTextInput.value = ''

    })
    

    
}
