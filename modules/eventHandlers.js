import { sanitizeHtml } from './utilts.js'
import { renderComments } from './renderComments.js'
import { comments, addComment, updateComments } from './comments.js'

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

export const handleAddComment = (authorInput, commentTextInput) => {
    const author = authorInput.value.trim()
    const text = commentTextInput.value.trim()

    if (!author || !text) {
        alert('Пожалуйста, заполните все поля')
        return
    }

    
      const newComment = {
        id: Date.now(),
        author: { name: sanitizeHtml(author) },
        text: sanitizeHtml(text),
        likes: 0,
        liked: false,
        date: new Date().toISOString()
    }


    addComment(newComment)
    renderComments()

    fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments', {
        method: 'POST',
        body: JSON.stringify({ name: author, text })
    })
        .then(response => response.json())
        .then(data => {
            if (data.comments && Array.isArray(data.comments)) {
                const normalizedComments = data.comments.map(c => ({
                    id: c.id,
                    text: c.text,
                    likes: c.likes || 0,
                    liked: c.liked || false,
                    date: c.date || new Date().toISOString(),
                    author: { name: c.name || c.author || 'Без имени' }
                }))
                updateComments(normalizedComments)
                renderComments()
            } else {
                console.error('Сервер вернул некорректные данные', data)
            }
        })
        .catch(error => console.error('Ошибка при отправке комментария:', error))


    authorInput.value = ''
    commentTextInput.value = ''
}

