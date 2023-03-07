import express from 'express'
import userCtrl from '../../controllers/user.controller.js'

const router = express.Router();


router.route('/test')
.get(userCtrl.test)

router.route('/')
.get(userCtrl.list)
.post(userCtrl.create)

router.route('/:id')
.put(userCtrl.update)
.delete(userCtrl.remove)


export default router