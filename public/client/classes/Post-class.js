class Post {
    constructor(sender, content, postTime) {
        this.sender = sender;
        this.content = content;
        this.postTime = postTime;
    }

    buildHTML() {
        return (
            "<div id='blog'> <header>" + this.sender + "</header><br /><p>" +
            this.content + "</p></div>"
        );
    }
}