import express from 'express'
import { PORT } from './config/config.js'
import usuariosRoutes from './routes/usuarios.routes.js'
// // import { imagenMulter } from './multer.js'
// import { cargar, mostrar, handleErrors, eliminarArchivo } from './controller.js'

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  const { origin } = req.headers
  const permitidos = ['http://127.0.0.1:5500']

  if (permitidos.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    next()
  }
})
app.use(usuariosRoutes)

// app.post('/upload-imagen', imagenMulter.single('imagen'), cargar)
// app.get('/upload-imagen/:nombreArchivo', mostrar)
// // app.post('/upload-pdf', pdfMulter.single('pdf'), cargar)
// // app.get('/upload-pdf/:nombreArchivo', mostrar)
// app.delete('/upload/:nombreArchivo', eliminarArchivo)
// app.use(handleErrors)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
