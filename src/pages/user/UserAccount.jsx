import React, {useState} from 'react'
import ResetAccountModal from '../../components/ResetAccountModal'

export default function UserAccount() {
  const [toggleModal, setToggleModal] = useState(false)

  function handleToggleModal() {
    setToggleModal(!toggleModal)
  }

  return (
    <div className="bg-300 w-full pb-4">
      <div className="bg-100 h-12 flex items-center justify-center text-xl tracking-wider text-500">
        <h1>Account</h1>
      </div>
      <div className="bg-100 mt-4 min-h-[1000px] p-4">
        <button className="primary-btn mt-10" onClick={handleToggleModal}>Reset Account</button>
      </div>
      {toggleModal &&
        <div>
          <ResetAccountModal
            handleToggleModal={handleToggleModal}
          />
        </div>
      }
    </div>
  )
}
