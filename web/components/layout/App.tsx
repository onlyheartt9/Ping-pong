// 此文件将会在服务端/客户端都将会用到
// 可通过 __isBrowser__ 或者 useEffect 判断当前在 浏览器环境做一些初始化操作
import React from "react";
import { LayoutProps } from "ssr-types-react";
import { Provider } from "reto";
import { XXXStore } from "@/model";
import { UserAvatar } from "../index";
import { Layout } from "antd";
import styles from "./index.module.less";
const { Header, Content } = Layout;

function ProviderContainer({ ofs, children }: any) {
  const of = ofs.pop();
  if (!of) {
    return <>{children}</>;
  }
  return (
    <Provider of={of}>
      <ProviderContainer ofs={ofs}>{children}</ProviderContainer>
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

export default (props: LayoutProps) => {
  const stores = [XXXStore];
  return (
    <ProviderContainer ofs={stores}>
      <Layout className={styles["layout"]}>
        <Header className={styles["header"]}>
          <HeaderContainer></HeaderContainer>
        </Header>
        <Content className={styles["content"]}>{props.children!}</Content>
      </Layout>
    </ProviderContainer>
  );
};
