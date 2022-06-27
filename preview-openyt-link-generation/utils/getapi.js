const key = "&key=AIzaSyDfJX6Kj_n57e7zTGrAyvOEWay2O4PWMVU";
const apiKey = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&";
const videokey = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=";

export function getapi(url) {
    if (url) {
        if (url.match('/channel/') || url.match('/c/') || url.match('/user/')) {
            return getapi_for_channel(url);
        }
        else if(url.match('/shorts/'))
        {
            return getapi_for_shorts(url);
        }
        return getapi_for_video(url);
    }
    return 'enter valid url';
}
function getapi_for_channel(url) {
    const rx1 = /^.*(?:(?:youtu\.be\/|c\/|channel\/|user\/))([^#\&\?]*).*/;
    const channel = url.match(rx1);
    // console.log("giving channel data");
    // console.log(channel);
    if (url.match('/channel')) {
        return `${apiKey}` + "id=" + `${channel[1]}${key}`;
    }
    return `${apiKey}` + "forUsername=" + `${channel[1]}${key}`;
}
function getapi_for_shorts(url)
{
    const rx1 = /^.*(?:(?:youtu\.be\/|shorts\/))([^#\&\?]*).*/;
    const short_id=url.match(rx1);
    return  `${videokey}${short_id[1]}${key}`;
}

function getapi_for_video(url) {
    const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const video_id = url.match(rx);
    return `${videokey}${video_id[1]}${key}`;
}