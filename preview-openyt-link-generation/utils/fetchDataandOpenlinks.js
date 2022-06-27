export async function fetchDataAndOpenLink(link,isMobile) {
    var url = "";
    if (link == '') {
        link = 'https://youtube.com/watch?v=';
    }
    if (isMobile) {
        if (link.match('.com/watch')) {
            url = link.split('?v=')[1];
        } else if (link.match('.com')) {
            url = link.split('.com/')[1];
        } else if (link.match('.be')) {
            url = link.split('.be/')[1];
        } else {
            console.log('unable to fetch data fromt the link');
        }
    } else {
        url = link;
    }
    console.log(url);
    return url;
};