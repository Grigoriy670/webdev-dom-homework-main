export let comments = [
  {
    id: 2,
    author: "Глеб Фокин",
    text: "Это будет первый комментарий на странице",
    date:  '2025-09-20T12:34:00.000Z',
    likes: 3,
    liked: false,
  },
  {
    id: 1,
    author: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! 🤍",
    date:  '2025-08-08T14:14:00.000Z',
    likes: 75,
    liked: true,
  },
];

export const sanitizeHtml = (value) => {
  return value.replaceAll("<", "&lt;").replaceAll(">", "&gt;")
};


export function addComment(author, text) {
  if (!author || !text) {
    alert("Пожалуйста, заполните все поля");
    return;
  }

  const newComment = {
    id: Date.now(),
    author: sanitizeHtml(author),
    text: sanitizeHtml(text),
    date: new Date().toISOString(),
    likes: 0,
    liked: false,
  };

  comments.unshift(newComment);
}

export function toggleLike(commentId) {
  const comment = comments.find(c => c.id === commentId);
  if (comment) {
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? 1 : -1;
  }
}
