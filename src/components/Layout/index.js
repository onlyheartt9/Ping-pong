import { Provider } from "reto";
import * as Stores from "@/model";
import { UserAvatar } from "../Avatar";
import { Button, Layout } from "antd";
import styles from "./style.module.less";
import Router from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IconFont } from "../IconFont";
import { hasLogin } from "@/utils";
const { Header, Content, Footer } = Layout;

function ProviderContainer({ ofs, children, pageProps, index = 0 }) {
  const of = ofs[index];
  if (!of) {
    return <>{children}</>;
  }
  return (
    <Provider of={of} memo args={[pageProps]}>
      <ProviderContainer ofs={ofs} index={index + 1} pageProps={pageProps}>
        {children}
      </ProviderContainer>
    </Provider>
  );
}

function useLogin() {
  const [isLogin, setLogin] = useState(false);

  return isLogin;
}

function HeaderContainer() {
  const isLogin = hasLogin();
  const jumpToHome = () => {
    Router.push("/");
  };
  const jumpToVote = () => {
    Router.push("/new");
  };
  const jumpToLogin = () => {
    Router.push("/login");
  };
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-title"]} onClick={jumpToHome}>
        乒乓Talk
      </div>
      <div className={styles["header-func"]}>
        <div className={styles["create"]} onClick={jumpToVote}>
          <IconFont type={"icon-fabujishu"}></IconFont>创建投票
        </div>
        {isLogin ? (
          <UserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></UserAvatar>
        ) : (
          <Button onClick={jumpToLogin}>登陆</Button>
        )}
      </div>
    </div>
  );
}
const TLayout = (props) => {
  const stores = Object.values(Stores);
  return (
    <ProviderContainer ofs={stores} pageProps={props.pageProps}>
      <Layout className={styles["layout"]}>
        <Header className={styles["header"]}>
          <HeaderContainer></HeaderContainer>
        </Header>
        <Content className={styles["content"]}>{props.children}</Content>
        <Footer className={styles["footer"]}>www.pptalk.cn</Footer>
      </Layout>
    </ProviderContainer>
  );
};

export default TLayout;
