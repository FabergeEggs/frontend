import styles from '../layout.module.css'
import LoginHeader from '@/src/ui/headers/LoginHeader/LoginHeader';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
        <LoginHeader/>
        {children}
    </div>
  );
}
