import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Modal from '../modal/modal'

//Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

const Question1Hint = () => {
  const [renderPista, setRenderPista] = useState(false)
  const [renderPista2, setRenderPista2] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 1.</h3>
        <div className="pista-options">
          <button
            onClick={() => {
              setRenderPista(true)
            }}
          >
            Obtener mi pista
          </button>
        </div>
        {renderPista && (
          <>
            <div className="pista">
              <p>No es la B..</p>
            </div>
            <div className="pista-options">
              <button
                onClick={() => {
                  setRenderPista2(true)
                }}
              >
                Obtener pista extra
              </button>
            </div>
          </>
        )}
        {renderPista2 && (
          <>
            <div className="pista">
              <p>
                basado en la definición de completa incertidumbre y de criterio
                Maximin.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  )
}

const Question1 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question1: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question1[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ4Pista = () => {
    setChildrenModal2({
      title: `HINT`,
      body: <Question1Hint />,
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
        <div className="question">
          <h3>Enunciado</h3>
          <p>
            La (1) __________ es una variable de entorno que utiliza el
            (2)_______________ para seleccionar una estratégia según el criterio
            como por ejemplo el criterio (3) ___________ donde se minimiza la
            pérdida basada en la posibilidad pesimista .{' '}
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
              A. (1) completa certeza; (2) teorema de bayes; (3) maximax
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
              B. (1) completa incertidumbre; (2) teorema de bayes; (3) maximin
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
              C. (1) completa incertidumbre; (2) criterio de bayes; (3) maximin
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
              D. (1) completa certeza; (2) criterio de bayes; (3) maximax
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question1
