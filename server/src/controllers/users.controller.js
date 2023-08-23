import MailingService from '../services/MailingService.js'
import { cartService, ticketService, userService } from '../services/repositories/index.js'
import { formatDate } from '../utils.js'

export async function registerUser (req, res) {
  const { firstName, lastName, email, age, password } = req.body
  if (!firstName || !lastName || !email || !age || !password) {
    return res.sendUserError('The fields provided are incompleted')
  }
  try {
    const user = await userService.getByEmail({ email })
    if (user) {
      return res.sendUserError('The email is already in use')
    } else {
      const { id } = await cartService.createCart()
      const result = await userService.register({ firstName, lastName, email, age, password, cartId: id })
      req.logger.info(`New user registered ${result.email}`)
      if (!result) throw Error('Error during registering user to the database')
      return res.sendSuccessInfo('User created successfully!')
    }
  } catch (error) {
    req.logger.warning(`Could not register the user reason: ${error.message}`)
    return res.sendServerError(`Could not register the user: ${error.message} `)
  }
}

export async function getUserData (req, res) {
  try {
    return res.sendSuccess(req.user)
  } catch (error) {
    return res.sendServerError(`Could not get the user data ${error}`)
  }
}

export async function getTickets (req, res) {
  const { page } = req.query
  if (page && isNaN(Number(page))) return res.sendUserError('The page received has to be a number')
  try {
    const { docs, totalPages, hasNextPage } = await ticketService.getTickets({ email: req.user.email, page })
    if (docs.length === 0) return res.sendSuccessInfo('Not tickets')
    const tickets = docs.map((ticket) => {
      const products = ticket.products?.map(e => (`${e.product?.title} x ${e.quantity}`)).join(', ')
      return { time: formatDate(ticket.time), amount: ticket.amount, products }
    })
    req.logger.info(`Tickets ${tickets}`)
    return res.sendSuccess({ tickets, totalPages, hasNextPage })
  } catch (error) {
    req.logger.error(`Could not get the data from de tickets reason: ${error.message}`)
    return res.sendServerError(`Could not get the data from de tickets ${error}`)
  }
}

export async function getAllUsers (req, res) {
  try {
    const users = await userService.getAll()
    return res.sendSuccess(users)
  } catch (error) {
    req.logger.error('Could not get all the users')
    return res.sendServerError('Could not get all the users')
  }
}

export async function deleteAllUsers (req, res) {
  try {
    const result = await userService.removeUsers()
    if (result.inactiveUsers.length === 0) return res.sendSuccessInfo('Not users to remove')
    const mailingService = new MailingService()
    result.inactiveUsers.forEach(async (e) => {
      await mailingService.sendSimpleMail({
        from: 'Test',
        to: e.email,
        subject: 'ShopFast',
        text: 'Your account has been deleted because you haven\'t been active for the last 2 days'
      })
    })
    res.sendSuccessInfo('Those users who have not been active for the last 2 days were removed')
  } catch (error) {
    req.logger.error('Could not remove the users')
    return res.sendServerError('Could not remove the users')
  }
}

export async function removeUserById (req, res) {
  const { uid } = req.params
  if (typeof uid !== 'string') return res.sendUserError('The id provided must be a string')
  const result = await userService.removeUserById({ id: uid })
  if (!result) return res.sendUserError('User not found')
  res.sendSuccessInfo('The user was removed')
}
