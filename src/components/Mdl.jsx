
import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Mdl({mdlShow,triggerClose,msg}) {
  

    return (
        <>
        
          <Modal show={mdlShow} onHide={triggerClose}>
            <Modal.Header closeButton>
              <Modal.Title>Account verification</Modal.Title>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={triggerClose}>
                Close
              </Button>
             
            </Modal.Footer>
          </Modal>
        </>
      );
  }


export default Mdl;