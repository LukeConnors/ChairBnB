import NewSpotForm from '../Spots/NewSpotForm'
import LoginFormPage from '../LoginFormPage'
import SignupFormPage from '../SignupFormPage'
import NewReviewForm from '../Spots/NewReviewForm'
import EditReviewForm from '../Spots/EditReviewForm'
import { useModalContext } from '../../context/modalContext'
import DeleteSpot from './DeleteSpot'
import DeleteReview from './DeleteReview'
import "./Modal.css"

const Modal = () => {
const {modal, setModal} = useModalContext()

const handleModalClose = () => {
    setModal(null)
}

const handleModalClick = (e) => {
    e.stopPropagation()
}

let modalToRender;
switch(modal) {
case 'newSpotForm':
modalToRender = <NewSpotForm />
break
case 'logInForm':
modalToRender = <LoginFormPage/>
break
case 'signUpForm':
modalToRender = <SignupFormPage/>
break
case 'reviewForm':
modalToRender = <NewReviewForm/>
break
case 'editReview':
modalToRender = <EditReviewForm/>
break
case 'deleteSpot':
modalToRender = <DeleteSpot/>
break
case 'deleteReview':
modalToRender = <DeleteReview/>
break

default:
handleModalClose()
return null
}
return (
<div className='modal-container'>
    <div className='modal'>
        {modalToRender}
    </div>
</div>
)

}

export default Modal
