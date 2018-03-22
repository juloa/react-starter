import React from "react"
import Image from "./"
import image from "./satellite.jpg"


export default {

  construct : Image,

  path : "",

  states : {

    default : () => <Image src={image} />,

    error : () => <Image src="src/images/satellite_toto.jpg"/>

  }
}
