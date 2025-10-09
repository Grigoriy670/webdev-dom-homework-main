
import { addComment } from "./comments.js";
import { renderComments } from "./render.js";

const authorInput = document.getElementById("author");
const commentTextInput = document.getElementById("comment-text");
const addCommentBtn = document.getElementById("add-comment");
const log = document.getElementById("log");

addCommentBtn.addEventListener("click", () => {
  const author = authorInput.value.trim();
  const text = commentTextInput.value.trim();

  const newComment = addComment(author, text);
  if (newComment) {
    renderComments(commentTextInput);
    authorInput.value = "";
    commentTextInput.value = "";
  }
});


commentTextInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && e.ctrlKey) {
    addCommentBtn.click();
  }
});


document.addEventListener("DOMContentLoaded", () => {
  log.textContent += "Страница загружена полностью!\n";
  renderComments(commentTextInput);
});
