import { renderComments } from './renderComments.js'
import { initEventHandlers } from './eventHandlers.js'
import { fetchComments } from './api.js'
import { updateComments } from './comments.js'

document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log')
    if (log) {
        log.textContent += 'Страница загружена полностью!\n'
    }

    renderComments()
    initEventHandlers()
})
fetchComments().then((data) => {
    updateComments(data)
    renderComments()
})
