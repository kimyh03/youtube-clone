/* eslint-disable no-underscore-dangle */
import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

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

const createComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  span.innerHTML = comment;
  delBtn.id = commentId;
  delBtn.addEventListener("click", handleDeleteClick);
  delBtn.innerHTML = "X";
  li.appendChild(span);
  li.appendChild(delBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  const commentId = response.data._id;
  if (response.status === 200) {
    createComment(comment, commentId);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
  init();
}
