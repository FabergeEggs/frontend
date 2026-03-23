import styles from './layout.module.css'
import SignupHeader from "@/src/ui/headers/SignupHeader/SignupHeader";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
        <SignupHeader/>
        {children}
    </div>
  );
}
