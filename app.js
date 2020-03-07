//app.js
import { config } from './config.js'
import { Token } from './modules/token.js'
const token = new Token()
App({
  onLaunch: function () {
    token.verify()
   
  }
})