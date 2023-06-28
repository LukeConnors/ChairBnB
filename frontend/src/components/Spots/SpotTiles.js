import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";

function SpotTiles() {
    const SpotCard = ({ spot }) => {
        const history = useHistory()
        const sessionUser = useSelector(userSelector)
    }


    return (
        <div className="spot-tile" onClick={redirectToSpot}>

        </div>
    )
}
