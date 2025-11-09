import { updateComments } from './comments.js'
import { sanitizeHtml } from './utilts.js'
import { renderComments } from './renderComments.js'
import { postComment, fetchComments } from './api.js'

export const initEventHandlers = () => {
    const authorInput = document.getElementById('author')
    const commentTextInput = document.getElementById('comment-text')
    const addCommentBtn = document.getElementById('add-comment')

    addCommentBtn.addEventListener('click', () =>
        handleAddComment(authorInput, commentTextInput)
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
    document.querySelector('.form-loading').style.display = 'block'
    document.querySelector('.add-form').style.display = 'none'

    postComment(sanitizeHtml(text), sanitizeHtml(author))
        .then(() => {
            return fetchComments()
        })

        .then((data) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            updateComments(data)
            renderComments()
            authorInput.value = ''
            commentTextInput.value = ''
        })
        .catch((error) => {
            document.querySelector('.form-loading').style.display = 'none'
            document.querySelector('.add-form').style.display = 'flex'

            if (error.message === 'Ошибка сервера') {
                alert('Ошибка сервера')
            }

            if (error.message === 'Неверный запрос') {
                alert('Имя и комментарий должны быть не короче 3х символов')

                authorInput.classList.add('-error')
                commentTextInput.classList.add('-error')

                setTimeout(() => {
                    authorInput.classList.remove('-error')
                    commentTextInput.classList.remove('-error')
                }, 2000)
            } else {
                alert('Нет соединения с интернетом')
            }
        })
}
