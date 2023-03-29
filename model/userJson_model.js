const userList = require("../data/user.json");
const fs = require("fs");

// permet de créer un utilisateur
exports.create = (user) => {
    userList.push(user);
    fs.writeFileSync("data/user.json", JSON.stringify(userList, null, 4));
}

// permet de get un utilisateur en fonction du mail
exports.getOne = (email) => {
    let user = userList.find(user => user.email === email);
    if (user) {
        return user;
    } else {
        throw new Error("Utilisateur non trouvé...");
    }
}

// get tout les utilisateurs
exports.getAll = () => {
    return userList.map(user => { return { email: user.email } });
}
