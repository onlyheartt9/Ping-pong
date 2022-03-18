import axios from "@/utils/axios";

function WithAuth(Page){
  const getInitialProps = Page.getInitialProps;
  if (getInitialProps) {
    Page.getInitialProps =async (ctx, ...e) => {
      axios.cookie = ctx.req.headers.cookie;
      const options =await getInitialProps(ctx, ...e);
      axios.cookie = null;
      return options
    };
  }
  return Page;
};
WithAuth.memo = false;

export { WithAuth };