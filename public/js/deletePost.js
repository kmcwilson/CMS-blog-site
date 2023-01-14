const deleteBtn = document.querySelectorAll('.delete-button');

const deletePost = async (blogId) => {
    const response = await fetch(`api/post/${blogId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        alert("Post successfull deleted!");
    } else {
        alert('Error occurred, failed to delete post')
    }
}

for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', () => {
        const blogId = deleteBtn[i].dataset.blogid;
        deletePost(blogId)
    }

    )
}

