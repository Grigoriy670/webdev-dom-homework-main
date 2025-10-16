export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const sanitizeHtml = (value) => {
    return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}
