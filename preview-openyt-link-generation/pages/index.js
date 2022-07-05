import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import logo from './../public/youtube-logo.png';
import styles from '../styles/Home.module.css';
import {TextField, Button, } from '@material-ui/core';
import { nanoid } from 'nanoid';
import app from '@firebase/app';
//import firestore from '../utils/db/index.js';
import { onload } from '../utils/db/index'
import { collection, addDoc, setDoc, doc, getDocs } from "@firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { createlogentry } from '../utils/db/createlogentry';
import Image from 'next/image'
import About_info from '../Components/about_Info';
import { style } from '@mui/system';
import { red } from '@material-ui/core/colors';
import styled from 'styled-components';
import All_creators from '../Components/All_creators';

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: #4DB6AC;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #4DB6AC;
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #4DB6AC;
    border-width: 2px;
 }
`;



export default function Home() {
  // const router = useRouter();
  // const url = "http://localhost:3000";
  // useEffect(() => {
  //   router.push(url);
  // });
  const [form, setForm] = useState({
    originalLink: "",
    _url:"",
  });
  const [copyurl, setcopyurl] = useState("");
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const fire = onload();
  const firestore = fire.firestore;
  const auth = getAuth();

  const handleChange = (event) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    })); 


 function YouTubeGetID(url) {
  const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
  const video_id = url.match(rx);
  return (video_id && video_id[1].length==11)? video_id[1] : false;
}

function isValidUrl(url) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  //this one works for /c but doesn't identify wrong id
   const rx1c = /^.*(?:(?:youtu\.be\/|c\/|channel\/|user\/))([^#\&\?]*).*/;
 //this one doesn't recognise /c but give checks for wrong id
   //var rx1c = /https?:\/\/(www\.)?youtube.com\/channel\/UC([-_a-z0-9]{22})/i;

  const rx1s = /^.*(?:(?:youtu\.be\/|shorts\/))([^#\&\?]*).*/;
  var matches = url.match(p) || url.match(rx1c) || url.match(rx1s);
  if(matches){
      return true;
  }
  return false;
}

  const handleGenerateURL = async () => {

      const validateUrl = isValidUrl(form.originalLink);
      if(validateUrl==false){
        setInvalid(true);
        setShow(false);
        setcopyurl("");
        console.log("Enter Valid URL");
        return;
      }
      else{
        setInvalid(false);
      }
      if(!validateUrl){
        console.log("Enter Valid URL");
        alert('Enter Valid URL');
        return;
      } 
      const shortCode = nanoid(6);
     // const baseurl = "https://openyt.app";
    //  const baseurl = "localhost:3000";
      const baseurl = "https://openytapp-next.vercel.app";
     // let openyturl = `${baseurl}/${context.query.links}`;
      const datadoc = {
        original_link : form.originalLink,
         _url : YouTubeGetID(form.originalLink),
        shortCode : shortCode,
       // createdAt : app.firestore.FieldValue.serverTimestamp(),
        totalClicks : 0,
        id : shortCode,
        link : `${baseurl}/${shortCode}`
      };
      await signInAnonymously(auth)
      .then(async () => {
         const colRef = collection(firestore, "OpenYTLinks");
         //const docRef = addDoc(colRef, link);
        await setDoc(doc(firestore, "OpenYTLinks", datadoc.id), datadoc);
        createlogentry(shortCode, form.originalLink);
        //console.log(docRef.id);
        //addDoc(colRef, link)
        // .then(() =>{
        //   console.log("its done")
        // })

        // getDocs(colRef)
        // .then((snapshot) => {
        //   let arraybooks = []
        //   snapshot.docs.forEach((doc) => {
        //     arraybooks.push({...doc.data(), id:doc.id})
        //   })
        //   console.log(arraybooks)
        // })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errormessage = error.message;
    });
      setShow(true);
      setcopyurl(datadoc.link);
      console.log(datadoc);
    };

    const CopyToClipboardButton = () => {
      setOpen(true);
     navigator.clipboard.writeText(copyurl)
  
    }
    
  return (
    <>
    

      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <div className={styles.content}>
        <div className="header">
          <img src= '/Youtube_full-color.webp' width="60" height="40" />
          <text className={styles.title}> Open YT</text>
        </div>
        
        <div> */}
<body>

        <div >
          {/* <img src= '/Youtube_full-color.webp' alt="" width="60" height="40" /> */}
          {/* <Image src= '/Youtube_full-color.webp' alt="" width="60" height="40"/> */}
          <text className={styles.title} > OpenYT</text>
        </div>
        <div className = {styles.container}>
        <div className={styles.child1}>
        <div>
          <About_info/>
        </div>
        <div>

        <br/> 
        {/* <label className={styles.text} htmlFor="homepage">Add your Youtube link:</label> */}
        {/* <label className={styles.text} htmlFor="homepage">Add your Youtube link:</label>
        <br/> */}
      
        <StyledTextField 
        //  className={styles.textField} 
        
        fullWidth value={form.originalLink} name="originalLink" onChange={handleChange} style={{marginBottom : "5px"}}  variant='outlined' label="Paste your youtube link here:"
        />
        
        
        <br/>
        {invalid && <text  className={styles.invalidtext}>This is not a youtube link! Try again.</text>}
        <Button onClick={handleGenerateURL} color='primary' style={{
        borderRadius: 4,
        backgroundColor: "#4DB6AC",
        padding: "9px 32px",
         fontSize: "16px",
         margin: '0 auto', display: "flex",
    }} variant = "contained" disableElevation  > GENERATE LINK</Button>
        <br/>
        
       <div className={styles.copyurl} >
       {show && < IconButton onClick={CopyToClipboardButton} >
        <ContentCopyIcon/>
      </IconButton>}
      <Snackbar
        message="Copied to clibboard"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
       
        
        {/* <Button onClick={CopyToClipboardButton}>Share</Button> */}
        {/* <button onClick={() =>  navigator.clipboard.writeText(copyurl)}>Copy</button> */}
        <label htmlFor="homepage" value="copyurl">{copyurl}</label>
       </div>
        {show && <label className={styles.tap_to_copy}>Tap to copy your OpenYT link</label>}
        
        <All_creators/>
      </div>
      </div>
      </div>
      </body>
      
    </>
  );
}


