
import Route from '@ioc:Adonis/Core/Route'

//base route
Route.on('/').render('welcome', { title: 'Home' })

//sign up route
Route.on('/signup').render('auth/signup', { title: 'signup' })

//login route
Route.on('/login').render('auth/login', { title: 'login' })
//login route
Route.on('/profile').render('profile', { title: 'profile' }).middleware('auth')

//route post for sign-up
Route.post('/signup','AuthController.signup')

//route post for sign-in
Route.post('/login', 'AuthController.login')

//route post for logout
Route.post('/logout','AuthController.logout')