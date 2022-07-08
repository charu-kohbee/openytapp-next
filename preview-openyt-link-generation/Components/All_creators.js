import styles from '../styles/Home.module.css';
import Image from 'next/image'
const All_creators = () => {
    return (
        <div>
            <h2 className={styles.hch} >
                Happy Creators!
            </h2>
            <div className={styles.row1}>

                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/insta_user.png' alt=""  width="70vw" height="70vh"/>
                    <text styles={{ fontSize: "10px" }}> aayushiiart</text>
                </div>
                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/instauser2.png' alt="" width="70vw" height="70vh"/>
                    <text> healthbykilo</text>
                </div>
                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/instauser5.png' alt="" width="70vw" height="70vh" />
                    <text> poojasharmaofficial</text>
                </div>
            </div>
            <div className={styles.row1}>

                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/instauser4.png' alt="" width="70vw" height="70vh" />
                    <text styles={{ fontSize: "10px" }}> kajal.2510</text>
                </div>
                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/instauser3.png' alt="" width="70vw" height="70vh" />
                    <text> ankitbala8</text>
                </div>
                <div className={styles.happy_creators}>
                    <Image className={styles.hchimage} src='/instauser6.png' alt="" width="70vw" height="70vh" />
                    <text>sam__1612_</text>
                </div>
            </div>
        </div>
    );
}

export default All_creators;