import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Notification from '../notification/notification'
import Modal from '../modal/modal'
import ModalNotification from '../modal/modalNotification'

// Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

//MathJAX
import { MathJax, MathJaxContext } from 'better-react-mathjax'

// Import image
const imageA = require('../../../public/verdadera.png')
const imageB = require('../../../public/falsa1.png')
const imageC = require('../../../public/falsa2.png')
const imageD = require('../../../public/falsa3.png')

const Question5Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 5.</h3>
        <div className="pista-options">
          <button
            onClick={() => {
              setRenderPista(true)
            }}
          >
            Obtener mi pista
          </button>
        </div>
      </div>
      {renderPista && (
        <div className="pista">
          <p>No es la D.</p>
        </div>
      )}
    </>
  )
}

const Question5 = ({ answers, setAnswers }) => {
  const { renderModal2, childrenModal2, setRenderModal2, setChildrenModal2 } =
    useModal()

  const answersDOM = useRef()

  const handleChecked = (x) => {
    for (let i = 0; i < answersDOM.current.children.length; i++) {
      answersDOM.current.children[i].children[1].setAttribute('class', 'false')
    }
    const liDOM = answersDOM.current.children[x - 1].children[1]
    liDOM.setAttribute('class', 'checked')
    const time = moment
      .unix(decodeJWT(localStorage.getItem('jwtStudent')).exp)
      .subtract(moment.duration(moment().format('hh:mm:ss')))
      .format('00:mm:ss')
    setAnswers({ ...answers, question5: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question5[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ5Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question5Pista />,
    })
    setRenderModal2(true)
  }

  return (
    <div className="card-question">
      {renderModal2 && (
        <Modal
          renderModal2={renderModal2}
          childrenModal2={childrenModal2}
          onClose={() => setRenderModal2(false)}
        />
      )}
      <div className="header-card">
        <div className="helpers">
          <div className="helpers-btn">
            <button
              onClick={() =>
                window.open(
                  'https://pregradoaulas.udistrital.edu.co/pluginfile.php/334801/mod_resource/content/2/%C3%81rbol%20de%20Decisi%C3%B3n.jpg'
                )
              }
            >
              Ayuda teórica
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://pregradoaulas.udistrital.edu.co/pluginfile.php/334802/mod_resource/content/2/EJEMPLOS%20DE%20AD.pdf'
                )
              }
            >
              Ayuda teórica
            </button>
            <button
              onClick={() =>
                window.open('https://www.youtube.com/watch?v=DF6nCMmpXAE')
              }
            >
              Ayuda teórica
            </button>
            <button onClick={handleQ5Pista}>Pista</button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            Para hacer frente a las ventas una empresa puede tomar las
            siguientes acciones: hacer horas extras, contratar mano de obra,
            alquiler de maquinaria, e incluso puede no tomar ninguna acción. Las
            ventas por su parte pueden ser crecientes o decrecientes, siendo P
            la probabilidad de que las ventas sean crecientes. A tenor de un
            estudio realizado por la propia empresa, los beneficios esperados en
            cada caso se muestran en la tabla siguiente en miles de euros:
          </p>
          <table>
            <thead
              style={{
                borderBottom: '1px solid #7f8c8d',
              }}
            >
              <tr>
                <th></th>
                <th>Ventas Crecientes</th>
                <th>Ventas Decreciente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: '#222f3e',
                    color: 'white',
                  }}
                >
                  <strong>Horas Extras</strong>
                </td>
                <td>500</td>
                <td>100</td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: '#222f3e',
                    color: 'white',
                  }}
                >
                  <strong>Contratar Mano de Obra</strong>
                </td>
                <td>700</td>
                <td>0</td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: '#222f3e',
                    color: 'white',
                  }}
                >
                  <strong>Alquiler de Maquinaria</strong>
                </td>
                <td>900</td>
                <td>-100</td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: '#222f3e',
                    color: 'white',
                  }}
                >
                  <strong>No Tomar Ninguna Acción</strong>
                </td>
                <td>400</td>
                <td>200</td>
              </tr>
            </tbody>
          </table>
          <p>
            ¿Cuál sería el árbol cuyos valores de la probabilidad{' '}
            <strong>P</strong> por los que decidirá hacer horas extras,
            contratar mano de obra, alquiler de maquinaria, o no tomar ninguna
            acción, respectivamente son correctos?
          </p>
        </div>
      </div>
      <div className="answers-card">
        <h4>Seleccione una única respuesta</h4>
        <ul
          ref={answersDOM}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <li>
            <input
              type="checkbox"
              name="rta-A"
              id="rta-A"
              onChange={() => handleChecked(1)}
            />
            <label htmlFor="rta-A">
              <p>A.</p>
              <div
                style={{
                  display: 'flex',
                  width: '590px',
                }}
              >
                <img
                  src={imageA}
                  alt="img-rta-A"
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">
              <p>B.</p>
              <div
                style={{
                  display: 'flex',
                  width: '590px',
                }}
              >
                <img
                  src={imageB}
                  alt="img-rta-A"
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">
              <p>C.</p>
              <div
                style={{
                  display: 'flex',
                  width: '590px',
                }}
              >
                <img
                  src={imageC}
                  alt="img-rta-A"
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">
              <p>D.</p>
              <div
                style={{
                  display: 'flex',
                  width: '590px',
                }}
              >
                <img
                  src={imageD}
                  alt="img-rta-A"
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question5
