import { FC, ReactNode, useEffect } from "react";
import { getMovies } from "../../store/Slice/Movies";
import { useAppDispatch } from "../../store/store";
import Header from "../Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
