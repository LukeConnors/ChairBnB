import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useModalContext } from '../../context/modalContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../store/spots'
import './DeleteSpot.css'

const DeleteSpot = () => {
    const {spotId} = useParams()
    const { setModal } = useModalContext();
    const history = useHistory();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.detailedSpot)

    const handleDeleteSpot = async () => {
        await dispatch(spotActions.removeSpot(spot.id))
        setModal(null)
        history.push('/spots/current')
       }

    const handleCancelClick = (e) => {
        setModal(null)
        };

    return (
        <div className="del-background">
            <h2 className='del-title'>Confirm Delete</h2>
            <p className="del-message">Are you sure you want to remove this spot?</p>
            <div className='del-container'>
            <button className="yes-button" onClick={handleDeleteSpot}>Yes (Delete Spot)</button>
            <button className="no-button" onClick={handleCancelClick}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpot
