import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../types/State'
import { Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { grow } from '../types/Motion';

interface InnerHTMLProps {
    text: string,
    iconClass?: string,
    loading: boolean
}

const InnerHTML: React.FC<InnerHTMLProps> = ({text, iconClass, loading}) => (
    <div>
        {loading ? 
            (
                <Spinner size='sm' animation='border'></Spinner>
            ) : 
            (
                <>
                    {iconClass ? 
                        (
                            <>
                                <i className={iconClass}></i> {text}
                            </>
                        ) 
                        : 
                        (
                            <>
                                {text}
                            </>
                        )
                    }
                </>
            )
        }
    </div>
)

const mapStateToProps = (state: State) => ({
    loading: state.loading.bool
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    changes?: boolean,
    callback?: () => void,
    isMotion?: boolean,
    text: string,
    iconClass?: string,
    type: 'button' | 'reset' | 'submit'
}

const LoadingButton: React.FC<Props> = ({ loading, changes, callback, isMotion, text, iconClass, type }) => {
    changes = changes !== undefined ? changes : true; 
    const isDisabled = (!changes || loading);
    return (
        <>
            {isMotion ? 
                (
                    <motion.button type={type} whileHover={grow} className={`btn-theme${isDisabled ? ' btn-disabled' : ''} black`} disabled={isDisabled} onClick={() => callback && callback()}>
                        <InnerHTML text={text} iconClass={iconClass} loading={loading}/>
                    </motion.button>
                )
                : 
                (
                    <button type={type} className={`btn-theme${isDisabled ? ' btn-disabled' : ''} black`} disabled={isDisabled} onClick={() => callback && callback()}>
                        <InnerHTML text={text} iconClass={iconClass} loading={loading}/>
                    </button>
                )
            }
        </>
    )
}

export default connector(LoadingButton);