import styles from '../public/static/css/alert.module.css'

export const showSuccessMessage = (success) => <div className={styles.success_message}>{success}</div>

export const showErrorMessage = (error) => <div className={styles.error_message}>{error}</div>