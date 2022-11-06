import { useRef, useEffect, useState } from 'react'
import '../../styles/questions/question.css'

//decode jwt
import decodeJWT from 'jwt-decode'

// Date
import moment from 'moment'

// Components
import Notification from '../notification/notification'
import Modal from '../modal/modal'
import ModalNotification from '../modal/modalNotification'

// Hooks
import useModal from '../../hooks/useModal'

//MathJAX
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const Question4Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 4.</h3>
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
          <p>No es la A.</p>
        </div>
      )}
    </>
  )
}

const Question4 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question4: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question4[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ4Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question4Pista />,
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
            <button onClick={handleQ4Pista}>Pista</button>
          </div>
        </div>
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            Los Árboles de Decisión son (1)______ de predicción o decisión de
            forma extensiva, específicamente diagramas de tipo (2)______. Se
            conforma por (3) ______ que representan, los primeros pueden ser de
            costo, decisión, probabilidad y hoja y lo segundo indican los
            caminos. Todo esto permite una (4)______ de un problema y organizar
            el trabajo de los cálculos que deben realizarse.
          </p>
        </div>
      </div>
      <div className="answers-card">
        <h4>Seleccione una única respuesta</h4>
        <ul ref={answersDOM}>
          <li>
            <input
              type="checkbox"
              name="rta-A"
              id="rta-A"
              onChange={() => handleChecked(1)}
            />
            <label htmlFor="rta-A">
              A. Métodos - Dibujo - Aplicaciones - Ayuda
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
              B. Jerarquía - Software - Triángulos y Cuadrados - Toma de
              decisión
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
              C. Procesos - Grafo - Nodos y Ramas - Visualización
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
              D. Ayudas - Experimental - Nodos - Jerarquía
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question4
