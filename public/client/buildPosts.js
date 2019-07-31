function buildPosts(postList) {
    console.log(postList[0]);
    let posts;
    for (let i = 0; i < postList.length; i++) {
        let post = new Post(postList[i].sender, postList[i].content, postList[i].postTime);
        posts += post.buildHTML();
    }
    return posts;
}