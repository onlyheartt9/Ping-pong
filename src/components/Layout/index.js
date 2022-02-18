import { Provider } from "reto";
import { XXXStore } from "@/model";
import { UserAvatar } from "../index";
import { Layout } from "antd";
import styles from "./style.module.less";
import { useEffect } from "react";
const { Header, Content, Footer } = Layout;

function ProviderContainer({ ofs, children, pageProps, index = 0 }) {
  const of = ofs[index];
  if (!of) {
    return <>{children}</>;
  }
  return (
    <Provider of={of} memo args={[pageProps]}>
      <ProviderContainer ofs={ofs} index={index + 1}>
        {children}
      </ProviderContainer>
    </Provider>
  );
}

function HeaderContainer() {
  return (
    <div className={styles["header-container"]}>
      <div>乒乓Talk</div>
      <div>
        <UserAvatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></UserAvatar>
      </div>
    </div>
  );
}
const TLayout = (props) => {
  return (
    <ProviderContainer ofs={[XXXStore]} pageProps={props.pageProps}>
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
