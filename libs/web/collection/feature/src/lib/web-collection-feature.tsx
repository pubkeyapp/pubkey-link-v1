import styles from './web-collection-feature.module.css'

/* eslint-disable-next-line */
export interface WebCollectionFeatureProps {}

export default function WebCollectionFeature(props: WebCollectionFeatureProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebCollectionFeature!</h1>
    </div>
  )
}
