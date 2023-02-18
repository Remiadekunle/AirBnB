import { CloseModalButton, useModal } from '../../context/Modal';
import './index.css';

function ComingSoon({feature}){
    const { closeModal } = useModal();
    return(
        <div className="comming-soon">
            {`${feature} Coming Soon`}
            <CloseModalButton closeModal={closeModal} />
        </div>
    )
}

export default ComingSoon
