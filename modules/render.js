import { toggleLike } from './comments.js'

export function formatDate(dateString) {
    return new Date(dateString).toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function renderComments(comments, container, commentTextInput) {
    container.innerHTML = ''

    comments.forEach((comment) => {
        const li = document.createElement('li')
        li.className = 'comment'
        li.dataset.id = comment.id

        li.innerHTML = `
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
          <button class="like-button ${
              comment.liked ? '-active-like' : ''
          }"></button>
        </div>
      </div>
    `

        li.addEventListener('click', () => {
            commentTextInput.value = `@${comment.author}, ${comment.text}\n`
            commentTextInput.focus()
        })

        li.querySelector('.like-button').addEventListener('click', (e) => {
            e.stopPropagation()
            toggleLike(comment.id)
            renderComments(comments, container, commentTextInput)
        })

        container.appendChild(li)
    })
}
