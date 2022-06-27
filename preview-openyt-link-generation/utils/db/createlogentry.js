import { getDatabase, set} from '@firebase/database'
import { ref } from "firebase/database";
export async function createlogentry(websiteId, url) {
    const baseurl = "openyt-nextapp/vercel.app";
    const db = getDatabase();
    const d = new Date();
    const shorturl = `${baseurl}/${websiteId}`;
            set(ref(db, `visitors/${websiteId}`), {
                "tmsCreate": (( Math.floor( d / 1000 ))), "original_link": url, "link" : shorturl, "id": websiteId, "total_visits":0, "unique_visits":0
            })
        return;
}