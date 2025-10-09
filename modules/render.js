// render.js
import { comments, toggleLike } from "./comments.js";

export const commentsContainer = document.getElementById("comments-container");

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function createCommentElement(comment, commentTextInput) {
  const commentElement = document.createElement("li");
  commentElement.className = "comment";
  commentElement.dataset.id = comment.id;

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
        <button class="like-button ${
          comment.liked ? "-active-like" : ""
        }"></button>
      </div>
    </div>
  `;

  commentElement.addEventListener("click", () => {
    commentTextInput.value = `@${comment.author}, ${comment.text}\n`;
    commentTextInput.focus();
    commentTextInput.setSelectionRange(
      commentTextInput.value.length,
      commentTextInput.value.length
    );
  });

  const likeButton = commentElement.querySelector(".like-button");
  likeButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleLike(comment.id);
    renderComments(commentTextInput);
  });

  return commentElement;
}

export function renderComments(commentTextInput) {
  commentsContainer.innerHTML = "";
  const sorted = [...comments].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  sorted.forEach((c) =>
    commentsContainer.appendChild(createCommentElement(c, commentTextInput))
  );
}
