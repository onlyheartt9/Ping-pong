import axios from "@/utils/axios";

function WithAuth(Page) {
  const getInitialProps = Page.getInitialProps;
  if (getInitialProps) {
    Page.getInitialProps = async (ctx, ...e) => {
      const isServer = typeof window === "undefined";
      if (isServer) {
        axios.cookie = ctx.req.headers.cookie;
      }
      
      const options = await getInitialProps(ctx, ...e);

      if (isServer) {
        axios.cookie = null;
      }

      return options;
    };
  }
  return Page;
}
WithAuth.memo = false;

export { WithAuth };
