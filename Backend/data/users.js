import bcryptjs from "bcryptjs";

const user = [
  {
    name: "Aman Gupta",
    email: "aman2419998@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "JaneDoe@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default user;
