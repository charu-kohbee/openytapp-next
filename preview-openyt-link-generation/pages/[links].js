import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { onload } from '../utils/db/index'
import { collection, query, where, limit, getDocs } from "@firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getapi } from '../utils/getapi';
import React from 'react'
import ReactLoading from 'react-loading'
import { parse } from 'next-useragent'
import { logVisitor } from '../utils/db/logvisitor'
import { PlayArrow } from '@material-ui/icons'
import Image from 'next/image'
import { fetchDataAndOpenLink } from '../utils/fetchDataandOpenlinks'
export async function getServerSideProps(context) {
   // const baseurl = "https://openyt.app";
  // const baseurl = "localhost:3000";
   const baseurl = "https://openytapp-next.vercel.app";
    let openyturl = `${baseurl}/${context.query.links}`;
    //console.log(openyturl);
    var id = '';
    var url="";
    const fire = await onload();
    const firestore = fire.firestore;
    const auth = getAuth();
   // console.log("hi charu");
    await signInAnonymously(auth)
        .then(async () => {
            const links = collection(firestore, 'OpenYTLinks');
            const que = query(links, where('link', '==', openyturl), limit(1));
          //  console.log("hi");
              
           const querysnapshot = await getDocs(que);
          // console.log(querysnapshot);
            querysnapshot.forEach((snapshot) => {
                var snappy = snapshot.data();
                url = snappy['original_link'];
                id = snappy['id'];
                // console.log(id);
                // console.log(url);
            }); 
        })
        .catch((error) => {

            const errorCode = error.code;
            const errormessage = error.message;
           // console.log(errorCode);
        });
    var uid;
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
        } else {
        }
    });
    logVisitor(id, uid, url);
    var img = "https://i.ibb.co/Nmv77Yr/placeholder.png";

    var img_url, tit, descp, link;
    var isChannel = false;
    var isShorts = false;
    const rx1 = /^.*(?:(?:youtu\.be\/|shorts\/))([^#\&\?]*).*/;
    if(url.match(rx1)){
        isShorts = true;
    }
    if (url && (url.match('youtube.com/') || url.match('youtu.be/'))) {
        const api = await getapi(url);
        //console.log(api);
        const data_from_api = await fetch(api);
        const data = await data_from_api.json();
       //console.log(data);
        if (data.pageInfo["resultsPerPage"] != 0) {
            if(api.match('forUsername') || api.match('id=')){
                descp = "";
                tit = " ";
                img_url = img;
                isChannel = true;
            }
            else{
                descp = data.items[0].snippet.description;
                tit = data.items[0].snippet.title;
                var thumbnails_data = data.items[0].snippet["thumbnails"];
                img_url = thumbnails_data?.high?.url || thumbnails_data?.medium?.url || thumbnails_data?.default?.url || img;
            }
            
        }
        else {
            img_url = img;
            tit = "Invalid url";
            descp = "this video is being deleted or unavailable at this time";
            url = "https://youtube.com/watch?v=";
        }
    }
    else {
        img_url = img;
        tit = "Invalid url";
        descp = "Please provide a valid url";
        url = "https://youtube.com/watch?v=";
    }
    var uaString = context.req.headers['user-agent'];
    let ua;
    if (uaString) {
        ua = parse(uaString)
    } else {
        ua = parse(window.navigator.userAgent)
    }
    var isIos = ua.isIos;
    var isAndroid = ua.isAndroid;
    var isMobile = isIos || isAndroid;
    var link = await fetchDataAndOpenLink(url, isMobile);
    return {
        props: {
            img_id: img_url,
            url,
            url_id: link,
            titl: tit,
            description: descp,
            isIos,
            isMobile,
            isChannel,
            isShorts,
        }
    }
}
export default function OpenytId({ img_id, url, url_id, titl, description, isIos, isMobile, isChannel, isShorts }) {
   // console.log(isMobile);
    const router = useRouter();
    useEffect(() => {
        if (isMobile) {
            if(isIos){
                router.push("youtube://" + url_id);
            }
            else{
                if(isChannel || isShorts){
                    window.location.assign("vnd.youtube://" + url_id);
            }
                else{
                    url = "www.youtube.com/watch?v=" + url_id;
                    window.location.assign("intent://" + url + "#Intent;scheme=https;end?sub_confirmation=1");
                    //window.location.assign("intent://" + url + "/#Intent;scheme=https;S.browser_fallback_url="+url+";end;");
                    //router.push("intent://" + url + "#Intent;scheme=https;end?sub_confirmation=1");
                   // window.location.assign("vnd.youtube://www.youtube.com/watch?v=" + url_id);
                }        
            }
            
        } else {
             router.push(url);
        }
    });
    function redirect_tolink() {
        if (isMobile) {
            if(isIos){
                router.push("youtube://" + url_id);
            }
            else{
                if(isChannel || isShorts){
                        window.location.assign("vnd.youtube://" + url_id);
                }
                else{
                    url = "www.youtube.com/watch?v=" + url_id;
                    //window.location.assign("intent://" + url + "#Intent;scheme=https;end?sub_confirmation=1");
                    //router.push("intent://" + url + "#Intent;scheme=https;end?sub_confirmation=1");
                    window.location.assign("vnd.youtube://www.youtube.com/watch?v=" + url_id);
                } 
            }  
        } else {
            router.push(url);
        }
    }
    return (
        <>
            <Head>
                <title>Welcome to Openyt</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff"></meta>
                <meta name="og:url" content="www.openyt.com" />
                <meta name="og:type" content="image/jpg" />
                <meta name="og:title" content={titl} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={img_id} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div>
                <div className={styles.child1}>
                    <div>
                        <Image src={`/api/imagefetcher?url=${encodeURIComponent(img_id)}`} alt={titl} height={250} width={330} priority />
                    </div>
                    <ReactLoading type={"bubbles"} color={"#9E9E9E"} height={50} width={100} delay={0.3} />
                    <div className={styles.child3}>
                        <PlayArrow style={{ color: "#1D797E", fontSize: 60 }} />
                        <h1 className={styles.openyt}>Open YT</h1>
                    </div>
                </div>
                <div className={styles.child2}>
                    <p style={{ fontSize: 15 }}>
                        <button onClick={redirect_tolink} className={styles.button1} > IF NOT REDIRECTED CLICK HERE</button>
                    </p>
                </div>
            </div>
        </>
    );
}


 // Linking
// .openURL( 'vnd.youtube://user/channel/' + url_id )
//document.body.addEventListener('click', () => console.log('clicked'));