import { useRef, useEffect, useState } from 'react'

//decode jwt
import decodeJWT from 'jwt-decode'

// Components
import Modal from '../modal/modal'

// Hooks
import useModal from '../../hooks/useModal'

// Date
import moment from 'moment'

const Question3Pista = () => {
  const [renderPista, setRenderPista] = useState(false)

  return (
    <>
      <div className="pista-container">
        <h3>This hint is about question 3.</h3>
        <div className="pista-options">
          <button
            onClick={() => {
              setRenderPista(true)
            }}
          >
            Get hint
          </button>
        </div>
      </div>
      {renderPista && (
        <div className="pista">
          <p>A is not the answer.</p>
        </div>
      )}
    </>
  )
}

const Question3 = ({ answers, setAnswers }) => {
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
    setAnswers({ ...answers, question3: [x, time] })
  }

  useEffect(() => {
    answersDOM.current.children[
      answers.question3[0] - 1
    ]?.children[1].setAttribute('class', 'checked')
  }, [answers])

  const handleQ3Pista = () => {
    setChildrenModal2({
      title: `PISTA`,
      body: <Question3Pista />,
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
                  'https://drive.google.com/file/d/1OZuDrl2AGu0V8S-omVyZ33Py5M7wCRdh/view?usp=sharing'
                )
              }
            >
              Theoretical support
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://www.ingenioempresa.com/modelos-probabilisticos-inventario/'
                )
              }
            >
              Theoretical support
            </button>
            <button onClick={handleQ3Pista}>Hint</button>
            <button
              onClick={() =>
                window.open(
                  'https://es.slideshare.net/Niurka0302/inventario-probabilistico-28957466'
                )
              }
            >
              Theoretical support
            </button>
          </div>
        </div>
        <div className="question">
          <h3>Statement</h3>
          <p>Third Question</p>
          {/* <ul>
            <li>
              1.
              <p>
                Los inventarios probabilísticos con demanda independiente se
                caracterizan por la suposición de que sólo se conoce la
                probabilidad de distribución de la demanda durante el tiempo de
                producción.
              </p>
            </li>
            <li>
              2.
              <p>
                En todo modelo probabilístico de inventario es crucial la
                determinación del punto de pedido (R) y el tamaño de pedido (Q),
                ya que el costo anual esperado del faltante se afectará por
                estos valores.
              </p>
            </li>
            <li>
              3.
              <p>
                El propósito de todo modelo de inventario probabilístico es en
                esencia, disminuir en lo posible el costo total esperado para un
                periodo determinado.
              </p>
            </li>
            <li>
              4.
              <p>
                Los inventarios probabilísticos son a su vez modelos
                estocásticos cuando algunas variables están en función de un
                modelo de probabilidad. Existen dos tipos de modelos
                estocásticos (punto de reorden y revisión periódica)
              </p>
            </li>
          </ul> */}
        </div>
      </div>
      <div className="answers-card">
        <h4>Select only one answer</h4>
        <ul ref={answersDOM}>
          <li>
            <input
              type="checkbox"
              name="rta-A"
              id="rta-A"
              onChange={() => handleChecked(1)}
            />
            <label htmlFor="rta-A">A. 1</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">B. 2</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">C. 3</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">D. 4</label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question3
