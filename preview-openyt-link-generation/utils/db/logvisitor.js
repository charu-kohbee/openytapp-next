import { getDatabase, set, update } from '@firebase/database'
import { database } from 'firebase-admin'
import { ref, onValue, child, get } from "firebase/database";
export async function logVisitor(websiteId, userId, url) {
    const db = getDatabase();
    const d = new Date();
    const dbRef = ref(db);
    //const baseurl = "openytapp-next.vercel.app";
    const baseurl = "https://openytapp-next.vercel.app";
    //const baseurl = "localhost:3000";
    const shorturl = `${baseurl}/${websiteId}`;
    get(child(dbRef, `visitors/${websiteId}/visitor_list/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
                update(ref(db,`visitors/${websiteId}`),{"total_visits": database.ServerValue.increment(1)})
        } else {
            update(ref(db,`visitors/${websiteId}`),{"total_visits": database.ServerValue.increment(1),"unique_visits":database.ServerValue.increment(1)});
            set(ref(db, `visitors/${websiteId}/visitor_list/${userId}`), {
                //"tmsCreate": (( Math.floor( d / 1000 )))
            }).then(()=>{
            }
            ).catch((eror)=>{
                console.log(error);
            } 
            );
        }
        return;
    }).catch((error) => {
        console.error(error);
    });
}