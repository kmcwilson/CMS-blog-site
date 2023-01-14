const submit = document.getElementById('add-comment');

const addComment = async ()=> {
const comment = document.getElementById('blog-comment');
const addCommentBtn = document.getElementById('add-comment');
const blogId = addCommentBtn.dataset.blogid;

if (comment) {

    const response = await fetch (`/api/post/${blogId}`, {
        method: 'POST',
        body: JSON.stringify({
            comment: comment.value
        }), 
        headers: {'Content-Type': 'application/json'}
    })
    if (response.ok){
        alert("Comment has been successfully added to this post!")
    } else {
        alert('Error occurred, failed to add comment')
    }
}
}

submit.addEventListener('click', (addComment))