import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class AuthController{

    public async signup({ request, response }: HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({
                name: schema.string(),
                email: schema.string({}, [rules.email()]),
                password: schema.string({}, [rules.confirmed()]),
            }),
            messages: {
                'name.required': 'Name is required to sign up',
                'email.required': 'Email is required to sign up',
                'password.required': 'Password is required to sign up'
            }

        })
        const user = await User.create({
            name: req.name,
            email: req.email,
            password: req.password
        }) 
      await  user.save;

        return response.redirect('/')


    }
    public async login({ request, response }: HttpContextContract) {
        const req = request.validate({
            schema: schema.create({
                email: schema.string({}, [
                rules.email()
                ]),
                password: schema.string({}, [
                    rules.minLength(8)
                ])

            }),
            messages: {
                 'email.required': 'Email field is required ',
                'password.required': 'Password is required'
            }
        })
        
    }

}
