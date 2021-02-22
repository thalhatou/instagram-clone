
import Route from '@ioc:Adonis/Core/Route'

//base route
Route.on('/').render('welcome')

//sign up route
Route.on('/signup').render('auth/signup')

//login route
Route.on('/login').render('auth/login')
//login route
Route.on('/profile').render('profile').middleware('auth')

//route post for sign-up
Route.post('/signup','AuthController.signup')

//route post for sign-in
Route.post('/login','AuthController.login')