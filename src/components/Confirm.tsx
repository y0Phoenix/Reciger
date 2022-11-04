import { Button, Modal } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { removeModal } from '../actions/modal';

const mapStateToProps = (state: State) => ({
    confirm: state.modal.confirm
});

const connector = connect(mapStateToProps, {removeModal})

type Props = ConnectedProps<typeof connector>;

const Confirm: React.FC<Props> = ({confirm, removeModal}) => {
    const {show, callbacks, title, body, props} = confirm;
    return (
        <Modal show={show} onHide={() => removeModal('confirm')} onEscapeKeyDown={() => removeModal('confirm')}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <div className='Flex center fit-container gap-md'>
                    <Button variant="primary" onClick={() => removeModal('confirm')}>
                        No
                    </Button>
                    <Button variant="danger" onClick={() => {
                        if (callbacks.length > 0) callbacks.forEach((callback, i) => callback(...props[i]));
                        removeModal('confirm');
                    }}>
                        Yes
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
export default connector(Confirm);