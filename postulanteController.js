import { pool } from '../db.js'

export const getPostulantes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM postulante')
    res.json(rows)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

export const getPostulantePorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params
    const [rows] = await pool.query('SELECT * FROM postulante WHERE codigo = ? or codigo_usuario = ?', [codigo, codigo])
    if (rows.length === 0) {
      res.status(404).send('Postulante no encontrado')
    } else {
      res.json(rows[0])
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

export const crearPostulante = async (req, res) => {
  try {
    const { nombre, apellido, pretencion_salarial, comentario, cv, codigo_usuario } = req.body
    const [result] = await pool.query('INSERT INTO postulante (nombre, apellido, pretencion_salarial, comentario, cv, codigo_usuario) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, pretencion_salarial, comentario, cv, codigo_usuario])
    const nuevoPostulante = { codigo: result.insertId, nombre, apellido, pretencion_salarial, comentario, cv, codigo_usuario }
    res.status(201).json(nuevoPostulante)
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}


export const actualizarPostulante = async (req, res) => {
  try {
    const { nombre, apellido, pretencion_salarial, comentario, cv, codigo_usuario } = req.body
    const fieldsToUpdate = {}
    if (nombre) fieldsToUpdate.nombre = nombre
    if (apellido) fieldsToUpdate.apellido = apellido
    if (pretencion_salarial) fieldsToUpdate.pretencion_salarial = pretencion_salarial
    if (comentario) fieldsToUpdate.comentario = comentario
    if (cv) fieldsToUpdate.cv = cv
    if (codigo_usuario) fieldsToUpdate.codigo_usuario = codigo_usuario
    
    if (Object.keys(fieldsToUpdate).length === 0) {
      res.status(400).send('Debe proporcionar al menos un campo para actualizar')
      return
    }
    
    const [result] = await pool.query('UPDATE postulante SET ? WHERE codigo = ?', [fieldsToUpdate, req.params.codigo])
    if (result.affectedRows === 0) {
      res.status(404).send('Postulante no encontrado')
    } else {
      const [postulante] = await pool.query('SELECT * FROM postulante WHERE codigo = ?', req.params.codigo)
      res.json(postulante)
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
}

  export const eliminarPostulante = async (req, res) => {
    try {
      const { codigo } = req.params
      const [result] = await pool.query('DELETE FROM postulante WHERE codigo = ?', [codigo])
      if (result.affectedRows === 0) {
        res.status(404).send('Postulante no encontrado')
      } else {
        res.status(200).send('Postulante eliminado exitosamente')
      }
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error')
    }
  }
  