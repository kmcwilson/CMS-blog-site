const submit = document.getElementById('add-blog');

const addPost = async (event)=> {
    event.preventDefault();

    const blogTitle= document.getElementById('blog-title');
    const blogPost = document.getElementById('blog-post');

    if ( blogTitle && blogPost ){
        const response = await fetch('/controller/api/blog-routes.js', {
            method: 'POST', 
            body: JSON.stringify({
                title: blogTitle.value,
                post: blogPost.value
            }),
            headers: {"Content-Type": "application/json"}
        })
        if (response.ok) {
            alert("Post has been successfully added to the forum!")
            document.location.replace("/")
        }
        else {
            alert('Error occurred, failed to make post')
        }
    }
}