import styles from '../styles/Home.module.css';
import Image from 'next/image'
const Happy_creators = () => {
    return ( 
        <div>
            <h2 className={styles.hch} >
            Happy Creators!
            </h2>
            <div className={styles.container1}>
                <div className={styles.flex_scroll}>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text styles={{fontSize: "10px"}}> aayushiiart</text>
                    </div>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text> aayushiiart</text>
                    </div>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text> aayushiiart</text>
                    </div>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text> aayushiiart</text>
                    </div>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text> aayushiiart</text>
                    </div>
                    <div className={styles.happy_creators}>
                        <Image className={styles.hchimage}src= '/insta_user.png' alt="" width="60" height="60"/>
                        <text> aayushiiart</text>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Happy_creators;