import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {

return{

name:"ByteSpin",

short_name:"ByteSpin",

description:"Free online tools",

start_url:"/",

display:"standalone",

background_color:"#0b1020",

theme_color:"#7c3aed",

icons:[

{

src:"/icon-512.png",

sizes:"512x512",

type:"image/png"

}

]

}

}