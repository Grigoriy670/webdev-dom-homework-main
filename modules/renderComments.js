import { comments, toggleLike, removeComment } from './comments.js'
import { formatDate } from './utilts.js'

const commentsContainer = document.getElementById('comments-container')

export const renderComments = () => {
    commentsContainer.innerHTML = ''

    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
    )

    sortedComments.forEach((comment) => {
        const commentElement = createCommentElement(comment)
        commentsContainer.appendChild(commentElement)
    })
}

const createCommentElement = (comment) => {
    const commentElement = document.createElement('li')
    commentElement.className = 'comment'
    commentElement.dataset.id = comment.id

    commentElement.innerHTML = `
        <div class="comment-header">
            <div>${comment.author}</div>
            <div>${formatDate(comment.date)}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">${comment.text}</div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.liked ? '-active-like' : ''}"></button>
            </div>
        </div>
        <div class="remove"></div>
    `

    commentElement.addEventListener('click', () => handleCommentClick(comment))

    const likeButton = commentElement.querySelector('.like-button')
    likeButton.addEventListener('click', (e) => {
        e.stopPropagation()
        toggleLike(comment.id)
        renderComments()
    })

    const removeBtn = commentElement.querySelector('.remove')
    removeBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        if (confirm('Вы уверены, что хотите удалить этот комментарий?')) {
            removeComment(comment.id)
            renderComments()
        }
    })

    return commentElement
}

const handleCommentClick = (comment) => {
    const commentTextInput = document.getElementById('comment-text')
    commentTextInput.value = `@${comment.author}, ${comment.text}\n`
    commentTextInput.focus()
    commentTextInput.setSelectionRange(
        commentTextInput.value.length,
        commentTextInput.value.length,
    )
}
