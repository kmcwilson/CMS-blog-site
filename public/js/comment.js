const submit = document.getElementById('add-comment');

const addComment = async (event)=> {
const comment = document.getElementByIf('blog-comment');

if (comment) {
    const response = await fetch ('', {
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

submit.addEvenetListener('click', (addComment))