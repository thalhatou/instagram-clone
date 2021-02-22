
import Route from '@ioc:Adonis/Core/Route'

//base route
Route.on('/').render('welcome')

//sign up route
Route.on('/signup').render('auth/signup')

//login route
Route.on('/login').render('auth/login')

//route post for sign-up
Route.post('/signup','SignupsController.index')