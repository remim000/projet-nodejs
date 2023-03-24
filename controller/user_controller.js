import userList from '../data/user.json' assert { type: "json" };
import fs from 'fs';

// Create un user
export const create = (user) => {
    userList.push(user);
    fs.writeFileSync("data/user.json", JSON.stringify(userList));
}

// Permet de get un utilisateur en fonction de son mail
export const getOne = (email) => {
    const user = userList.find(user => user.email === email);
    if (user) {
        return user;
    } else {
        throw new Error('Utilisateur non trouvé');
    }
}

export const update = () => {

}

// export const delete = () => {

// }
