import React, { useState } from 'react'
import { Card, Nav } from 'react-bootstrap'
import Billing from './Billing';
import Personal from './Personal';
import { linkDark } from '../../types/Style';

const Account = () => {
    // state for the navigation on the page
    const [nav, setNav] = useState<'/personal' | '/billing'>('/personal');

    return (
        <div className='Flex center'>
            <div className='Flex gap-xxlg margin-xxlg'>
                <Card>
                    <Card.Body className='bg-inner'>
                        <Nav variant='tabs' defaultActiveKey={'/personal'} className='Flex vertical' onSelect={(key) => key && (key == '/personal' || key == '/billing') && setNav(key)}>
                            <Nav.Item>
                                <Nav.Link style={linkDark} eventKey={'/personal'} as='button' className='btn-theme'>
                                    <i className='fa-solid fa-circle-info'></i> Personal
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link style={linkDark} eventKey={'/billing'} as='button' className='btn-theme'>
                                    <i className='fa-solid fa-credit-card'></i> Billing
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body className='account-content-container bg-inner'>
                        {nav == '/personal' ? 
                            (
                                <Personal />
                            )
                            :
                            (
                                <Billing />
                            )
                        }
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Account