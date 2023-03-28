const postList = require("./../data/post.json");
const fs = require("fs");

exports.create = (post) => {
    postList.push(post);
    fs.writeFileSync("data/post.json", JSON.stringify(postList, null, 4));
}

exports.getAll = () => {
    return postList;
}

exports.getOne = (title) => {
    let post = postList.find(post => post.title === title);
    if (post) {
        return post;
    } else {
        throw new Error("Post non trouvé");
    }
}