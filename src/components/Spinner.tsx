import styles from "@/styles/modules/spinner.module.css"

import { NextPage } from 'next'

interface Props {}

const Spinner: NextPage<Props> = ({}) => {
  return <div className={styles.loaderBox}>
    <span className={styles.loader}></span>
    
  </div>
}

export default Spinner