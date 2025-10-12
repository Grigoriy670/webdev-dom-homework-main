import { addComment, getSortedComments } from './comments.js'
import { renderComments } from './render.js'
import {rerender} from './render.js'

const authorInput = document.getElementById('author')
const commentTextInput = document.getElementById('comment-text')
const addCommentBtn = document.getElementById('add-comment')
const commentsContainer = document.getElementById('comments-container')
const log = document.getElementById('log')


