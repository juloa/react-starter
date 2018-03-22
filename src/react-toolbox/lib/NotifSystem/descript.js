import React from "react"
import Notif from "./Notif"

export default {

  categ : "UI components",

  construct : Notif,

  descript : `Système de notifications. Pour une notification qui doit apparaître sur toutes les pages,
              on peut utiliser l'action addNotification du store (fichier components/NotifSystem)`,

  path : "components/NotifSystem/Notif",

  link : "https://github.com/igorprado/react-notification-system",

  states : {

    success : () => <Notif level="success">Hello world</Notif>,

    error : () => <Notif level="error">Hello world</Notif>,

    warning : () => <Notif level="warning">Hello world</Notif>,

    info : () => <Notif level="info">Hello world</Notif>,

    topLeft : () => <Notif position="tl">Hello world</Notif>,

    topCenter : () => <Notif position="tc">Hello world</Notif>,

    bottomLeft : () => <Notif position="bl">Hello world</Notif>,

    bottomCenter : () => <Notif position="bc">Hello world</Notif>,

    bottomRight : () => <Notif position="br">Hello world</Notif>,

    multiple : () => <div>
      <Notif level="success">Hello world</Notif>
      <Notif level="error">Hello world</Notif>
      <Notif level="warning">Hello world</Notif>
      <Notif level="info">Hello world</Notif>
      <Notif position="tl">Hello world</Notif>
      <Notif position="tc">Hello world</Notif>
      <Notif position="bl">Hello world</Notif>
      <Notif position="bc">Hello world</Notif>
      <Notif position="br">Hello world</Notif>
    </div>


  }
}
