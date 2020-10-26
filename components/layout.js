import styles from '../styles/layout.module.css'

export default function Layout({children}) {
  return (
    <div>
      <div className={styles.topMenu}>
        <a href="https://ebird.org">
          <img src="/images/cornel_logo.png" height="40px" style={{paddingRight: "5px"}}/>
          <img src="/images/ebird_logo.png" height="35px" />
        </a>
      </div>
      {children}
      <div className={styles.footer}>Built by Teale Fristoe - <a href="mailto:fristoe@gmail.com">fristoe@gmail.com</a></div>
    </div>
  )
}
