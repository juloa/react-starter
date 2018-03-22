/* eslint no-alert:0 */

import React from "react"
import ConfirmWrap from "./"
import Button from "react-toolbox/lib/Button"

export default {

  construct : ConfirmWrap,

  states : {

    default : () => (
      <ConfirmWrap>
        <Button onClick={ function onClick() { alert("Confirmé") } }>
          Cliquez pour confirmer
        </Button>
      </ConfirmWrap>
    ),

    customMessage : () => (
      <ConfirmWrap message="Etes-vous sûr de vouloir faire ceci ?">
        <Button onClick={ function onClick() { alert("Confirmé") } }>
          Cliquez pour confirmer
        </Button>
      </ConfirmWrap>
    ),

    intl : () => (
      <ConfirmWrap message={ { id : "areYouSureMessage", defaultMessage : "Are you sure ?" } }>
        <Button onClick={ function onClick() { alert("Confirmé") } }>
          Cliquez pour confirmer
        </Button>
      </ConfirmWrap>
    )

  }
}
