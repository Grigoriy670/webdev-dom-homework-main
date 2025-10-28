import { renderComments } from './renderComments.js'
import { initEventHandlers } from './eventHandlers.js'
import { updateComments } from './comments.js';


fetch('https://wedev-api.sky.pro/api/v1/gleb-fokin/comments')
.then((response) => {
    return response.json()
}).then((data) => {
    updateComments(data.comments);
    renderComments()
})

document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log')
    if (log) {
        log.textContent += 'Страница загружена полностью!\n'
    }

    renderComments()
    initEventHandlers()
})



