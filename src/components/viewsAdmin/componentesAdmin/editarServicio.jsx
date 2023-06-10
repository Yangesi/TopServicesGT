import { useState, useEffect } from 'react';
import { ListGroup, Button, Form, Card, Row, Col, Alert } from 'react-bootstrap';
import { getServicios } from '../../../../helpers/getServicios'
import { actualizarServicio } from '../../../../helpers/servicio'

//contexto
import { TokenContext } from '../../../../src/components/context/contexto';
import { useContext } from 'react';

export const EditarServicio = () => {
  const [servicios, setServicios] = useState([]);
  const [codigoServicio, setCodigoServicio] = useState(0);
  const [codigoTipoServicio, setCodigoTipoServicio] = useState(0);
  const [nombre, setNombre] = useState('');

  //contexto
  const { token } = useContext(TokenContext);

  //manejador de error y realizado
  const [error, setError] = useState('');
  const [realizado, setRealizado] = useState('');

  //contador de clicks para actualizar los useffect
const [asignarClickCount, setAsignarClickCount] = useState(0);

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
    //tengo que ejecutar este useeffect cada vez que se guarden cambios al editar un servicio
  }, [codigoServicio, asignarClickCount]);

  console.log(servicios);

  const handleEditarServicio = (codigo, codigoTipoServicio, nombre) => {
    // Aquí puedes realizar las acciones deseadas con el código y el código_tipo_servicio
    console.log(`Editar servicio con código ${codigo} y código de tipo de servicio ${codigoTipoServicio}`);
    setCodigoServicio(codigo);
    setCodigoTipoServicio(codigoTipoServicio);
    setNombre(nombre);
  };

  const handleGuardarCambios = async () => {
    // Aquí puedes realizar las acciones para guardar los cambios
    console.log('Guardar cambios');
    console.log('Código de tipo de servicio:', codigoTipoServicio);
    console.log('Nombre:', nombre);

    try{
    const actualizarServicioo = {
        codigo_tipo_servicio: codigoTipoServicio,
        nombre
    }

    const data = await actualizarServicio(codigoServicio, actualizarServicioo, token)
    console.log(data)

    setAsignarClickCount(asignarClickCount + 1);
    setRealizado('Asignación realizada');
    setError(null);

  }catch(error)
  {
    if (error.response && error.response.data) {
      const mensajeError = error.response.data.error;
      setError(mensajeError);
    } else {
      setError('Error al editar el servicio.');
    }
  }
  };
  

  
return (

      <Card style={{maxHeight: '400px', overflowY: 'auto', backgroundColor: '#f6f6f6' }} className="mt-4 mx-4">
        <Card.Body>
          <Row>
            <Col xs={12} md={7}>
              <Card.Title>Editar Servicio</Card.Title>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
    )}

              <ListGroup variant="flush">
                {servicios.map((servicio) => (
                  <ListGroup.Item key={servicio.codigo}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>{servicio.nombre}</span>
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleEditarServicio(
                            servicio.cod_servicio,
                            servicio.cod_tipo,
                            servicio.nombre
                          )
                        }
                      >
                        Editar
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={5}>
              <Form>
                <Form.Group controlId="codigoTipoServicio">
                  <Form.Label>Tipo de Servicio</Form.Label>
                  <Form.Control
                    as="select"
                    value={codigoTipoServicio}
                    onChange={(e) => setCodigoTipoServicio(e.target.value)}
                  >
                    <option value="1">Tipo 1</option>
                    <option value="2">Tipo 2</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end mt-4">
                  <Button variant="primary" onClick={handleGuardarCambios}>
                    Guardar cambios
                  </Button>
                </div>

              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>

);
}
