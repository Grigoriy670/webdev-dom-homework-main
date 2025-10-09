import { addComment, getSortedComments } from "./comments.js";
import { renderComments } from "./render.js";

const authorInput = document.getElementById("author");
const commentTextInput = document.getElementById("comment-text");
const addCommentBtn = document.getElementById("add-comment");
const commentsContainer = document.getElementById("comments-container");
const log = document.getElementById("log");

function rerender() {
  renderComments(getSortedComments(), commentsContainer, commentTextInput);
}

addCommentBtn.addEventListener("click", () => {
  const author = authorInput.value.trim();
  const text = commentTextInput.value.trim();
  const newComment = addComment(author, text);
  if (newComment) {
    authorInput.value = "";
    commentTextInput.value = "";
    rerender();
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});

commentTextInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) addCommentBtn.click();
});

document.addEventListener("DOMContentLoaded", () => {
  log.textContent += "Страница загружена полностью!\n";
  rerender();
});
