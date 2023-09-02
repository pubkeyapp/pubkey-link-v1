import styles from './web-report-ui.module.css'

/* eslint-disable-next-line */
export interface WebReportUiProps {}

export function WebReportUi(props: WebReportUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebReportUi!</h1>
    </div>
  )
}

export default WebReportUi
