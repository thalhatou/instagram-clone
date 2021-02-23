import { DateTime } from 'luxon'
import { BaseModel,beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Mail from '@ioc:Adonis/Addons/Mail'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string
  @column()
  public email: string
  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  //password hasing here before saving into the database.
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  public async sendVerificationEmail() {
    
      
        //send verification mail
  Mail.send((message) => {
  message
    .from('verify@instagram.com')
    .to(this.email)
    .subject('Please Verify Your Email!')
    .htmlView('emails/verify', { user :this })
})
    
  }
}
