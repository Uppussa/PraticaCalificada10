import { pool } from '../config/db.js'

export const index = async (req, res) => {
  try {
    const sql = 'SELECT u.usuario_id, u.usuario_nombre, u.usuario_email, u.foto, r.rol_nombre FROM usuarios u INNER JOIN roles r ON u.rol_id = r.rol_id;'
    const [usuarios] = await pool.query(sql)
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno' })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query('DELETE FROM usuarios WHERE usuario_id = ?', [id])
    // Verificar si se eliminó algún usuario
    if (result.affectedRows === 1) {
      res.json({ message: 'Usuario eliminado' })
    } else {
      // Si no se eliminó ningún usuario (no se encontró el ID), devolver un error
      res.status(404).json({ message: 'El usuario no existe' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error interno' })
  }
}

export const save = async (req, res) => {
  try {
    const { nombre, email, foto, rol_id: rolId } = req.body

    if (!nombre || !email || !foto || !rolId) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('INSERT INTO usuarios(usuario_nombre, usuario_email, foto, rol_id) VALUES (?, ?, ?, ?)', [nombre, email, foto, rolId])
    res.status(201).json({ message: 'Usuario creado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: 'No se reconoce al usuario' })

    const { nombre, email, foto, rol_id: rolId } = req.body

    if (!nombre || !email || !foto || !rolId) {
      return res.status(400).json({ message: 'Datos faltantes' })
    }

    await pool.execute('UPDATE usuarios SET usuario_nombre = ?, usuario_email = ?, foto = ?,  rol_id = ? WHERE usuario_id = ?', [nombre, email, foto, rolId, id])
    res.status(201).json({ message: 'Usuario Actualizado' })
  } catch (error) {
    res.status(500).json({ message: 'hubo un error interno', details: error.message })
  }
}
