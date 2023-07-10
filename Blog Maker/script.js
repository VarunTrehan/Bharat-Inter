document.getElementById('blogForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const image = document.getElementById('image').files[0];
    const video = document.getElementById('video').value;

    // Create a new blog post object
    const blogPost = {
        title: title,
        content: content,
        image: image ? URL.createObjectURL(image) : null,
        video: video
    };

    // Display the blog post
    displayBlogPost(blogPost);

    // Clear the form fields
    clearForm();
});

function displayBlogPost(blogPost) {
    // Create elements for the blog post
    const blogContainer = document.createElement('div');
    blogContainer.classList.add('blog-container');

    const titleElement = document.createElement('h2');
    titleElement.textContent = blogPost.title;

    const contentElement = document.createElement('p');
    contentElement.textContent = blogPost.content;

    const imageElement = document.createElement('img');
    imageElement.src = blogPost.image;
    imageElement.alt = 'Blog Image';

    const videoElement = document.createElement('iframe');
    videoElement.src = getYouTubeEmbedURL(blogPost.video);
    videoElement.frameborder = '0';

    // Append elements to the blog container
    blogContainer.appendChild(titleElement);
    blogContainer.appendChild(contentElement);
    if (blogPost.image) {
        blogContainer.appendChild(imageElement);
    }
    if (blogPost.video) {
        blogContainer.appendChild(videoElement);
    }

    // Append the blog container to the blog posts section
    const blogPostsSection = document.getElementById('blogPosts');
    blogPostsSection.appendChild(blogContainer);
}

function getYouTubeEmbedURL(url) {
    // Convert regular YouTube URL to embed URL
    const videoID = extractVideoID(url);
    return `https://www.youtube.com/embed/${videoID}`;
}

function extractVideoID(url) {
    // Extract video ID from different YouTube URL formats
    let videoID = '';

    if (url.indexOf('youtube.com') !== -1) {
        // Extract ID from regular YouTube URL
        const urlParams = new URLSearchParams(new URL(url).search);
        videoID = urlParams.get('v');
    } else if (url.indexOf('youtu.be') !== -1) {
        // Extract ID from youtu.be short URL
        videoID = url.substring(url.lastIndexOf('/') + 1);
    } else {
        // Assume the input is the video ID itself
        videoID = url;
    }

    return videoID;
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('image').value = '';
    document.getElementById('video').value = '';
}
