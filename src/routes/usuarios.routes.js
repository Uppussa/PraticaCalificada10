import { Router } from 'express'
import { index, remove, save, update } from '../controllers/usuarios.controller.js'
import { uploadFile } from '../config/multer.js'

const router = Router()

router.get('/api/usuarios', index)

router.delete('/api/usuarios/:id', remove)

router.post('/api/usuarios', uploadFile.single('foto'), save)

router.put('/api/usuarios/:id', update)

export default router
