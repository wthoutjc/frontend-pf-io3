import '../../styles/start/start.css'
import { useEffect, useState } from 'react'

//Components
import Login from './login'
import Register from './register'
import ModalNotification from '../modal/modalNotification'

//Hooks
import useModal from '../../hooks/useModal'

const Start = () => {
  const [renderRegister, setRenderRegister] = useState(false)

  // Modal States
  const { renderModal, childrenModal, setRenderModal, setChildrenModal } =
    useModal()

  return (
    <>
      {renderModal && (
        <ModalNotification
          renderModal={renderModal}
          childrenModal={childrenModal}
          onClose={() => setRenderModal(false)}
        />
      )}
      <div className="start">
        <div className="start-by">
          <h1>Web Application Presented By</h1>
          <h3>Grupo 1</h3>
          <h3>Grupo 2.A</h3>
          <h3>Grupo 2.B</h3>
        </div>
        {!renderRegister ? (
          <div className="login">
            <Login
              setRenderRegister={setRenderRegister}
              setRenderModal={setRenderModal}
              setChildrenModal={setChildrenModal}
            />
          </div>
        ) : (
          <div className="register">
            <Register
              setRenderRegister={setRenderRegister}
              setRenderModal={setRenderModal}
              setChildrenModal={setChildrenModal}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Start
