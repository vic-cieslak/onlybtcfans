import * as base from './base.js'
import * as db from './db.js'
import * as email from './email.js'
import * as facebook from './facebook.js'
import * as google from './google.js'
import * as twitter from './twitter.js'

/*
  Assign the base service to the firebaseServices namespace in the
  serviceConnection boot file. Over time other service modules separate by
  logic/concerns will be added here. Be aware of name conflicts between
  your modules.
*/
export default Object.assign({}, base, db, email, facebook, google, twitter)
