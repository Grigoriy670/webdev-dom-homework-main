import { renderComments } from './renderComments.js'
import { initEventHandlers } from './eventHandlers.js'
import { fetchComments } from './api.js'
import { updateComments } from './comments.js'


document.querySelector('.comments').innerHTML = 'Пожалуйста подождите, загружаю комментарии...'

document.addEventListener('DOMContentLoaded', () => {
    fetchComments().then((data) => {
        updateComments(data)
        renderComments()
        initEventHandlers()
    })
})
