import bcrypt from 'bcryptjs';


const users=[
    {
    name:'Admin User',
    email:'admin@example.com',
    password:bcrypt.hashSync('123456',10),
    isAdmin:true

},
{
    name:'Iman Bachat ',
    email:'iman@example.com',
    password:bcrypt.hashSync('123456',10)

},
{
    name:'Ziko Bachat',
    email:'ziko@example.com',
    password:bcrypt.hashSync('123456',10)

},
]

export default users;