import express from 'express'

const router = express.Router()

router.route('/:admin')
  .get((req, res) => {
    res.render('secret/login')
  })

export default router
