const submit = document.getElementById('add-blog');

const addPost = async (event) => {
    event.preventDefault();

    const blogTitle = document.getElementById('blog-title');
    const blogPost = document.getElementById('blog-post');

    if (blogTitle && blogPost) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: blogTitle.value,
                post: blogPost.value
            }),
            headers: { "Content-Type": "application/json" }
        })
        if (response.ok) {
            alert("Post has been successfully added to the forum!")
            document.location.replace("/dashboard")
        }
        else {
            alert('Error occurred, failed to make post')
        }
    }
}
if (submit) {
    submit.addEventListener("click", addPost)
};

const updateBtn = document.getElementById('update-blog');

const updatePost = async () => {
    const blogTitle = document.getElementById('blog-title');
    const blogPost = document.getElementById('blog-post');
    const blogIdUpdate = updateBtn.dataset.blogid;
    const response = await fetch(`/api/post/${blogIdUpdate}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: blogTitle.value,
            post: blogPost.value
        }),
        headers: { 'Content-Type': 'application/json' }

    })
    if (response.ok) {
        alert('Post is successfully updated')
        document.location.replace('/dashboard')
    } else {
        alert('Error occurred, unable to update post!')
    }

}
if (updateBtn) {
    updateBtn.addEventListener('click', updatePost)
};