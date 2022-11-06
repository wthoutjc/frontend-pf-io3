import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Modal from '../modal/modal'

// Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

const Question2Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>Esta pista esta relacionada con el punto 2.</h3>
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
          <p>No es la B.</p>
        </div>
      )}
    </>
  )
}

const Question2 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question2: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question2[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ2Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question2Pista />,
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
            Una empresa va desarrollar el plan estratégico, donde se piensa en
            contratar un especialista o por el contrario se piensa hacer por
            cuenta propia, desplegando así la siguiente matriz que empresa la
            ganancia o pérdida en dólares:
          </p>
          <table>
            <thead
              style={{
                borderBottom: '1px solid #7f8c8d',
              }}
            >
              <tr>
                <th></th>
                <th>S1: Éxito del plan estratégico</th>
                <th>S2: Fracaso del plan estratégico</th>
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
                  <strong>D1: Desarrollo por cuenta propia</strong>
                </td>
                <td>350</td>
                <td>545</td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: '#222f3e',
                    color: 'white',
                  }}
                >
                  <strong>D2:Contratar a un especialista</strong>
                </td>
                <td>-240</td>
                <td>-370</td>
              </tr>
            </tbody>
          </table>
          <p>
            Por medio del criterio a priori, y teniendo en cuenta que la
            efectividad del plan estratégico es de un 65%, se halló que:
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
              A. Se decidió contratar un especialista, ya que esta decisión
              consta con una esperanza de 143.5
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
              B. Se decidió desarrollarlo por cuenta propia, ya que esta
              decisión consta con una esperanza de 310.15
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
              C. Se decidió desarrollarlo por cuenta propia, ya que esta
              decisión consta con una esperanza de 143.5
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
              D. Se decidió contratar un especialista, ya que esta decisión
              consta con una esperanza de 224.75
            </label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question2
