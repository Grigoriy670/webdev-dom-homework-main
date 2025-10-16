import { renderComments } from './renderComments.js'
import { initEventHandlers } from './eventHandlers.js'

document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log')
    if (log) {
        log.textContent += 'Страница загружена полностью!\n'
    }

    renderComments()
    initEventHandlers()
})
