import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";


export default class AuthController {
  public async signup({ request, response ,session }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.confirmed()]),
      }),
      messages: {
        "name.required": "Name is required to sign up",
        "email.required": "Email is required to sign up",
        "password.required": "Password is required to sign up",
      },
    });
    const user = await User.create({
      name: req.name,
      email: req.email,
      password: req.password,
    });
    await user.save
     session.flash('success', 'Account created successfully')

    //send verification mail
    user?.sendVerificationEmail()
    return response.redirect("/");
  }

  /** login controller function */
  public async login({auth, request, response ,session }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
        password: schema.string({}, [rules.minLength(8)]),
      }),
      messages: {
        "email.required": "Email field is required ",
        "password.required": "Password is required",
        "password.minLength": "Password most be at least 8 characters long",
      },
    });
    
      const email = req.email
      const password = req.password
    await auth.attempt(email, password)
     session.flash('success', 'Successfully Login')
      response.redirect('/profile')
  }


  
  public async logout({ auth,response }: HttpContextContract) {
    await auth.logout()
    response.redirect('/')
    
  }
}
