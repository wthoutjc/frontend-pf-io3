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
                  'https://www.minitab.com/es-mx/predictive-analytics/cart/#:~:text=Para%20quienes%20no%20est%C3%A1n%20familiarizados,valores%20y%20combinaciones%20de%20predictores.'
                )
              }
            >
              Theoretical support
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://www.lucidchart.com/pages/es/que-es-un-diagrama-de-arbol-de-decision'
                )
              }
            >
              Theoretical support
            </button>
            <button onClick={handleQ3Pista}>Hint</button>
            <button
              onClick={() =>
                window.open(
                  'https://www.maximaformacion.es/blog-dat/que-son-los-arboles-de-decision-y-para-que-sirven/'
                )
              }
            >
              Theoretical support
            </button>
          </div>
        </div>
        <div className="question">
          <h3>Statement</h3>
          <p>
            Decision tree-based algorithm that works by examining various ways
            of locally partitioning or splitting the data into smaller segments
            based on different values and combinations of predictors, selecting
            the best performing splits, and then repeats this process
            recursively until the optimal set is found.
          </p>
          <p>Which algorithm is the above sentence referring to?</p>
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
            <label htmlFor="rta-A">A. ID3</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-B"
              id="rta-B"
              onChange={() => handleChecked(2)}
            />
            <label htmlFor="rta-B">B. CART</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-C"
              id="rta-C"
              onChange={() => handleChecked(3)}
            />
            <label htmlFor="rta-C">C. MARS</label>
          </li>
          <li>
            <input
              type="checkbox"
              name="rta-D"
              id="rta-D"
              onChange={() => handleChecked(4)}
            />
            <label htmlFor="rta-D">D. CHAID</label>
          </li>
        </ul>
      </div>
      <div className="footer-card"></div>
    </div>
  )
}

export default Question3
