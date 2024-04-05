const URL ="https://shopfastback.onrender.com"
const CONSTANTS = {
    LOGIN_URL : `${URL}/api/jwt/login`,
    REGISTER_URL: `${URL}/api/users/register`,
    LOGOUT_URL : `${URL}/api/jwt/logout`,
    USER_URL: `${URL}/api/users/data`,
    PRODUCTS_URL: `${URL}/api/products`,
    CART_URL:`${URL}/api/carts`,
    USER_TICKETS_URL:`${URL}/api/users/tickets`,
    ALL_USERS_URL: `${URL}/api/users`,
    GITHUB_LOGIN_URL:`${URL}/api/jwt/github`,
    GUEST_EMAIL:'guest@example.com',
    GUEST_PASS:'123456'
}

export default CONSTANTS