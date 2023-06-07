import { useState, useEffect } from 'react';
import { ListGroup, Button, Form, Card, Row, Col } from 'react-bootstrap';
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

  useEffect(() => {
    const obtenerServicios = async () => {
      const data = await getServicios();
      setServicios(data);
    };
    obtenerServicios();
    //tengo que ejecutar este useeffect cada vez que se guarden cambios al editar un servicio
  }, [codigoServicio]);

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

    const actualizarServicioo = {
        codigo_tipo_servicio: codigoTipoServicio,
        nombre
    }

    const data = await actualizarServicio(codigoServicio, actualizarServicioo, token)
    console.log(data)
  };

  
return (
  <Row>
    <Col>
      <Card style={{maxHeight: '400px', overflowY: 'auto' }} className="mx-auto">
        <Card.Body>
          <Row>
            <Col xs={12} md={6}>
              <Card.Title>Editar Servicio</Card.Title>

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
            <Col xs={12} md={6}>
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

                <Button variant="primary" onClick={handleGuardarCambios}>
                  Guardar cambios
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  </Row>
);
}
