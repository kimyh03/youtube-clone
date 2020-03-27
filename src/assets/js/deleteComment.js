import axios from "axios";

const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = target => {
  target.parentElement.remove();
  decreaseNumber();
};

const handleDeleteClick = async e => {
  const {
    target,
    target: { id: commentId }
  } = e;
  const response = await axios({
    url: `/api/${commentId}/comment/delete/`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    deleteComment(target);
  }
};

const init = () => {
  document
    .querySelectorAll(".commentDeleteBtn")
    .forEach(delbtn => delbtn.addEventListener("click", handleDeleteClick));
};

init();
