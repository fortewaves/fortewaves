const router = require('express').Router()


router.use(require('./investment.js'))
// router.use(require('./referal.js'))
// router.use(require('./transfers.js'))
// router.use(require('./savings.js'))
// router.use(require('./support.js'))
// router.use(require('./subscriptions.js'))
router.use(require('./user.js'))
router.use(require('./wallet.js'))
// router.use(require('./withdraw.js'))


module.exports = router