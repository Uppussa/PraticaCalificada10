import path from 'node:path'
import fs from 'fs'

export function cargar (req, res) {
  return res.json({ Message: 'Archivo cargado exitosamente' })
}

export function mostrar (req, res) {
  try {
    const { nombreArchivo } = req.params
    if (!nombreArchivo) {
      return res.status(400).json({ message: 'proporcione nombre rapidooooo!!' })
    }
    const rutaImagen = path.resolve(`./upload/${nombreArchivo}`)
    res.sendFile(rutaImagen)
  } catch (error) {
    return res.status(500).json({ message: 'No se pudo mostrar la imagen' })
  }
}

export function eliminarArchivo (req, res) {
  try {
    const { nombreArchivo } = req.params
    if (!nombreArchivo) {
      return res.status(400).json({ message: 'Proporcione un nombre de archivo' })
    }
    const rutaArchivo = path.resolve(`./upload/${nombreArchivo}`)
    if (fs.existsSync(rutaArchivo)) {
      fs.unlinkSync(rutaArchivo)
      res.status(200).json({ message: 'Archivo eliminado exitosamente' })
    } else {
      res.status(404).json({ message: 'El archivo no existe' })
    }
  } catch (error) {
    res.status(500).json({ message: 'No se pudo eliminar el archivo', error: error.message })
  }
}

export const handleErrors = (err, req, res, next) => {
  if (err.message) {
    return res.status(400).json({ message: err.message })
  } else {
    return res.status(500).json({ message: 'Hubo un error interno' })
  }
}
